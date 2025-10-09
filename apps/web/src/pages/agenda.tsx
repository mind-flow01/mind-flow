import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
} from '@mui/icons-material';
import styles from '../styles/Agenda.module.css';

const Agenda: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const mockAppointments = [
  {
    id: 1,
    time: '10:00 - 11:00',
    startTime: 10, // Hora em formato numérico
    endTime: 11,   // Hora em formato numérico
    patient: 'Beatriz Costa',
    type: 'Terapia Online',
    status: 'CONFIRMADO',
    statusColor: 'success',
    dataDaConsulta: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 dia a partir de agora
    category: 'Consulta inicial',
    tags: ['online', 'nova'],
  },
  {
    id: 2,
    time: '14:00 - 15:00',
    startTime: 14, // Hora em formato numérico
    endTime: 15,   // Hora em formato numérico
    patient: 'Beatiiz Costa',
    type: 'Terapia Online',
    status: 'CONFIRMADO',
    statusColor: 'success',
    dataDaConsulta: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 dias a partir de agora
    category: 'Acompanhamento',
    tags: ['retorno'],
  },
  {
    id: 3,
    time: '14:00 - 15:00',
    startTime: 14, // Hora em formato numérico
    endTime: 15,   // Hora em formato numérico
    patient: 'Abel Ferreira',
    type: 'Terapia Cognitivo-Comportamental',
    status: 'A CONFIRMAR',
    statusColor: 'warning',
    dataDaConsulta: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 dias a partir de agora
    category: 'Avaliação',
    tags: ['presencial', 'avaliacao'],
  },
  {
    id: 4,
    time: '09:00 - 10:00',
    startTime: 9,  // Hora em formato numérico
    endTime: 10,   // Hora em formato numérico
    patient: 'Carlos Silva',
    type: 'Terapia de Grupo',
    status: 'CONFIRMADO',
    statusColor: 'success',
    dataDaConsulta: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 dias a partir de agora
    category: 'Consulta de Grupo',
    tags: ['grupo', 'presencial'],
  },
  {
    id: 5,
    time: '16:00 - 17:00',
    startTime: 16, // Hora em formato numérico
    endTime: 17,   // Hora em formato numérico
    patient: 'Maria Oliveira',
    type: 'Terapia Online',
    status: 'A CONFIRMAR',
    statusColor: 'warning',
    dataDaConsulta: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 dias a partir de agora
    category: 'Consulta de Acompanhamento',
    tags: ['online'],
  },
  {
    id: 6,
    time: '13:00 - 14:00',
    startTime: 13, // Hora em formato numérico
    endTime: 14,   // Hora em formato numérico
    patient: 'José da Silva',
    type: 'Terapia Online',
    status: 'A CONFIRMAR',
    statusColor: 'warning',
    dataDaConsulta: new Date(Date.now() + 86400000 * 2).toISOString(), // 10 dias a partir de agora
    category: 'Consulta de Acompanhamento',
    tags: ['online'],
  },
];


  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof mockAppointments[0] | null>(null);
  const [selectedOccurrenceDate, setSelectedOccurrenceDate] = useState<Date | null>(null);

  // Handlers do modal
  const handleOpenModal = (appointment: typeof mockAppointments[0], occurrenceDate?: Date) => {
    setSelectedAppointment(appointment);
    setSelectedOccurrenceDate(occurrenceDate ?? null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
    setSelectedOccurrenceDate(null);
  };

  // Função para obter o nome do dia da semana
  const getDayName = (dayIndex: number) => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    return days[dayIndex];
  };

  // retorna segunda-feira (início da semana) para uma dada data
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const diffToMonday = (d.getDay() + 6) % 7; // 0=Dom -> 6, 1=Seg ->0
    d.setDate(d.getDate() - diffToMonday);
    d.setHours(0,0,0,0);
    return d;
  };

  // Função para obter a data do dia (apenas dia do mês, usada no cabeçalho do grid)
  const getDayDate = (dayIndex: number) => {
    const start = getWeekStart(currentDate);
    const date = new Date(start);
    date.setDate(start.getDate() + dayIndex);
    return date.getDate();
  };

  // Função para obter o mês e ano (texto do cabeçalho)
  const getMonthYear = () => {
    const start = getWeekStart(currentDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      const month = start.toLocaleDateString('pt-BR', { month: 'long' });
      const year = start.getFullYear();
      return `${start.getDate()} - ${end.getDate()} de ${month}, ${year}`;
    }

    const startLabel = start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const endLabel = end.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const year = start.getFullYear() === end.getFullYear() ? start.getFullYear() : `${start.getFullYear()} / ${end.getFullYear()}`;
    return `${startLabel} - ${endLabel}, ${year}`;
  };

  // Navega entre semanas
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  // Obter agendamentos do dia (index 0..6)
  const getAppointmentsForDay = (dayIndex: number) => {
    const weekStart = getWeekStart(currentDate);
    return mockAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.dataDaConsulta);
      const apDayIndex = (appointmentDate.getDay() + 6) % 7; // segunda = 0
      return apDayIndex === dayIndex && appointmentDate >= weekStart && appointmentDate < new Date(weekStart.getTime() + 7 * 86400000);
    });
  };

  // Posição vertical/altura (corrigido para iniciar em 08:00)
  const getAppointmentPosition = (startTime: number) => {
    return (startTime - 8) * 60; // 08:00 = top 0
  };
  const getAppointmentHeight = (startTime: number, endTime: number) => {
    return (endTime - startTime) * 60;
  };

  // Gera próximas consultas para os próximos N dias, agrupadas por data
  const getUpcomingAppointments = (daysAhead = 21) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    // precria o mapa de dias futuros
    const map: Record<string, { date: Date; items: typeof mockAppointments }> = {};
    for (let i = 0; i < daysAhead; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const key = d.toISOString().slice(0,10); // YYYY-MM-DD
      map[key] = { date: d, items: [] as any };
    }

    // percorre os agendamentos reais e coloca no dia correspondente (comparando date local)
    mockAppointments.forEach(apt => {
      const apDate = new Date(apt.dataDaConsulta);
      apDate.setHours(0,0,0,0);
      const key = apDate.toISOString().slice(0,10);
      if (map[key]) {
        map[key].items.push(apt);
      }
    });

    // transforma em array ordenado e ordena itens por hora de início
    const entries = Object.keys(map)
      .filter(k => map[k].items.length > 0)
      .sort()
      .map(k => ({
        key: k,
        day: map[k].date,
        items: map[k].items.sort((a: any, b: any) => (a.startTime ?? 0) - (b.startTime ?? 0))
      }));

    return entries;
  };

  const upcoming = getUpcomingAppointments(21); // próximos 21 dias

  
// Mock data para simular a resposta de uma API

  return (
    <div className={styles.agendaContainer}>
      <Container maxWidth="xl">
        {/* Header da Agenda: título + nav de semana + botão agendar */}
        <Box className={styles.headerSection}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                Agenda (Semana)
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems="center" justifyContent={isMobile ? 'center' : 'flex-end'}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton onClick={() => navigateWeek('prev')} size="small">
                    <ChevronLeft />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: '150px', textAlign: 'center' }}>
                    {getMonthYear()}
                  </Typography>
                  <IconButton onClick={() => navigateWeek('next')} size="small">
                    <ChevronRight />
                  </IconButton>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    backgroundColor: '#20B2AA',
                    '&:hover': { backgroundColor: '#1A9B94' },
                    minWidth: isMobile ? '100%' : 'auto',
                  }}
                >
                  {isMobile ? 'Agendar' : 'Agendar Nova Sessão'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Grid do Calendário (sempre semanal) */}
        <Paper className={styles.calendarGrid}>
          <Grid container>
            {/* Eixo de tempo */}
            <Grid item xs={1} className={styles.timeAxis}>
              <Box sx={{ height: '600px', position: 'relative' }}>
                {Array.from({ length: 11 }, (_, i) => {
                  const hour = 8 + i;
                  return (
                    <Box key={hour} className={styles.timeSlot}>
                      {hour.toString().padStart(2, '0')}:00
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            {/* Dias da semana */}
            <Grid item xs={11}>
              <Grid container>
                {Array.from({ length: 7 }, (_, i) => (
                  <Grid item xs={12/7} key={i}>
                    <Box className={styles.dayHeader}>
                      <Typography className={styles.dayName}>
                        {getDayName(i)}
                      </Typography>
                      <Typography className={styles.dayDate}>
                        {getDayDate(i)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box className={styles.appointmentsContainer}>
                {/* Linhas de grade */}
                {Array.from({ length: 11 }, (_, i) => (
                  <Box
                    key={i}
                    className={styles.gridLine}
                    sx={{ top: i * 60 }}
                  />
                ))}

                {/* Colunas dos dias */}
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <Box
                    key={dayIndex}
                    className={styles.dayColumn}
                    sx={{
                      left: `${(dayIndex * 100) / 7}%`,
                      width: `${100 / 7}%`,
                    }}
                  />
                ))}

                {/* Agendamentos */}
                {mockAppointments.map((appointment) => {
                  const weekStart = getWeekStart(currentDate);
                  const appointmentDate = new Date(appointment.dataDaConsulta);
                  const dayIndex = (appointmentDate.getDay() + 6) % 7; // Ajusta para segunda como 0

                  if (appointmentDate >= weekStart && appointmentDate < new Date(weekStart.getTime() + 7 * 86400000)) {
                    return (
                      <Paper
                        key={appointment.id}
                        className={`${styles.appointmentCard} ${styles[appointment.statusColor === 'success' ? 'confirmed' : 'pending']}`}
                        sx={{
                          left: `${(dayIndex * 100) / 7 + 2}%`,
                          width: `${100 / 7 - 4}%`,
                          top: `${getAppointmentPosition(appointment.startTime)}px`,
                          height: `${getAppointmentHeight(appointment.startTime, appointment.endTime)}px`,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOpenModal(appointment, appointmentDate)}
                        role="button"
                        tabIndex={0}
                      >
                        <Box>
                          <Typography className={styles.appointmentTime}>
                            {appointment.time}
                          </Typography>
                          <Typography className={styles.appointmentPatient}>
                            {appointment.patient}
                          </Typography>
                        </Box>
                      </Paper>
                    );
                  }
                  return null;
                })}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Lista de próximas consultas (agrupadas por dia) */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Próximas consultas</Typography>
          <Divider />
          <Box mt={2}>
            {upcoming.length === 0 ? (
              <Typography color="text.secondary">Nenhuma consulta agendada nos próximos dias.</Typography>
            ) : (
              upcoming.map(group => {
                const dateLabel = group.day.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
                return (
                  <Box key={group.key} mb={2}>
                    <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>{dateLabel}</Typography>
                    <Box mt={1}>
                      {group.items.map((apt) => {
                        const parts = group.key.split('-');
                        const occurrence = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                        return (
                          <Paper key={`${group.key}-${apt.id}`} className={styles.upcomingItem} sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">{apt.time}</Typography>
                              <Typography variant="body1">{apt.patient}</Typography>
                              <Typography variant="caption" color="text.secondary">{apt.type}</Typography>
                            </Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip label={apt.status} size="small" color={apt.statusColor as any} />
                              <Button size="small" onClick={() => handleOpenModal(apt, occurrence)}>Ver</Button>
                            </Stack>
                          </Paper>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Container>

      {/* Modal com informações detalhadas (categoria e tags ocultas nos cards) */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Detalhes do Agendamento</DialogTitle>
        <DialogContent dividers>
          {selectedAppointment ? (
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">Paciente</Typography>
              <Typography variant="body1">{selectedAppointment.patient}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Horário</Typography>
              <Typography variant="body1">{selectedAppointment.time}</Typography>

              {selectedOccurrenceDate && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Data</Typography>
                  <Typography variant="body1">{selectedOccurrenceDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</Typography>
                </>
              )}

              <Typography variant="subtitle2" color="text.secondary">Tipo</Typography>
              <Typography variant="body1">{selectedAppointment.type}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Categoria</Typography>
              <Typography variant="body1">{selectedAppointment.category}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Tags</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {selectedAppointment.tags.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Stack>

              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip label={selectedAppointment.status} color={selectedAppointment.statusColor as any} size="small" />
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} size="small">Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Agenda;
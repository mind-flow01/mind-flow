import { Container, Stack, Typography, Button, Paper } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight={700}>Mind Flow</Typography>
        <Typography variant="body1" color="text.secondary">
          Hub digital para psicólogos: agenda inteligente, transcrição e gestão clínica simples.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Entrar</Button>
          <Button variant="outlined">Criar conta</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Próximos passos</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure autenticação, conexão Supabase e sua agenda.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}




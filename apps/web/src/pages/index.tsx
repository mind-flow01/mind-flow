import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Stack, Typography, Button, Paper, CircularProgress, Alert } from '@mui/material';

export default function Home() {
  const { data: session, status } = useSession();
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(session)

  const handleApiRequest = async () => {
    setIsLoading(true);
    setError(null);
    setApiData(null);

    if (!session || !session.accessToken) {
      setError('Sessão ou token de acesso não encontrado.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setApiData(data);

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao fazer a requisição.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button 
            variant="contained"
            color="secondary"
            onClick={handleApiRequest} 
            disabled={isLoading || status !== 'authenticated'}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Chamar API (/test)'}
          </Button>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}
        
        {apiData && (
          <Paper variant="outlined" sx={{ p: 2, mt: 2, background: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>Resposta da API</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </Paper>
        )}

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
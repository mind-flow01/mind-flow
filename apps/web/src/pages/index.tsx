import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Stack, Typography, Button, Paper, CircularProgress, Alert } from '@mui/material';

export default function Home() {
  const { data: session, status } = useSession();
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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


}
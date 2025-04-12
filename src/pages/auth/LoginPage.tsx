import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '@/api/hooks/auth/useAuth';
import { LoginRequest } from '@/api/generated/models/LoginRequest';
import { useAuthStore } from '@/store/authStore';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isPending: isLoggingIn } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const loginData: LoginRequest = {
      identifier: formData.get('identifier') as string,
      password: formData.get('password') as string,
    };

    try {
      await new Promise<void>((resolve, reject) => {
        login(loginData, {
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            reject(error);
          }
        });
      });
      
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (isAuthenticated) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError('La connexion a échoué. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
      <Card className="w-full md:w-4 p-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">Connexion</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-column gap-3">
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="identifier"
                name="identifier"
                className="w-full"
                required
              />
              <label htmlFor="identifier">Email ou nom d'utilisateur</label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                className="w-full"
                required
                toggleMask
                feedback={false}
              />
              <label htmlFor="password">Mot de passe</label>
            </span>
          </div>

          {error && (
            <Message severity="error" text={error} />
          )}

          <Button
            type="submit"
            label={isLoggingIn ? 'Connexion en cours...' : 'Se connecter'}
            className="w-full"
            disabled={isLoggingIn}
          />
        </form>
      </Card>
    </div>
  );
}; 
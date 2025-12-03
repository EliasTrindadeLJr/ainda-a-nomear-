import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.senha);
    if (success) {
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('Matrícula ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">META</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Centro Universitário</p>
          </div>
          <CardDescription className="text-lg font-medium text-foreground">
            Portal do Aluno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Matrícula</Label>
              <Input
                id="email"
                type="text"
                placeholder="Digite sua matrícula"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                {...register('senha')}
                className={errors.senha ? 'border-destructive' : ''}
              />
              {errors.senha && (
                <p className="text-sm text-destructive">{errors.senha.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="flex justify-between text-sm pt-2">
              <button type="button" className="text-destructive hover:underline">
                🔒 Esqueci minha senha
              </button>
              <Link to="/cadastro" className="text-primary hover:underline">
                🆕 Criar Nova Conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

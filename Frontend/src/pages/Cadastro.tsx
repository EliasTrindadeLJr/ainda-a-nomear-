import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cadastroSchema, CadastroFormData } from '@/lib/schemas';
import { toast } from 'sonner';
import { Shield, ArrowLeft } from 'lucide-react';
import { cadastrarAluno } from '@/lib/users';

const Cadastro = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

const onSubmit = async (data: CadastroFormData) => {
  try {
    await cadastrarAluno(data);

    toast.success("Cadastro realizado com sucesso!");
    setTimeout(() => navigate("/login"), 1500);
  } catch (error: any) {
    toast.error(error.message || "Erro ao cadastrar");
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
            Cadastro de Aluno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Digite seu endereço completo"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={errors.birthDate ? 'border-destructive' : ''}
              />
              {errors.birthDate && (
                <p className="text-sm text-destructive">{errors.birthDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                {...register('cpf')}
                className={errors.cpf ? 'border-destructive' : ''}
              />
              {errors.cpf && (
                <p className="text-sm text-destructive">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>

            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-4">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Spinner } from '@/components/ui/spinner';
import { api, type ApiError } from '@/lib/api';
import { useAuthStore, type AuthUser } from '@/lib/auth-store';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession, token } = useAuthStore();

  useEffect(() => {
    if (token) navigate('/', { replace: true });
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      api.post<{ user: AuthUser; token: string }>('/auth/login', values),
    onSuccess: (data) => {
      setSession(data);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
      navigate('/', { replace: true });
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Login failed');
    },
  });

  function fillDemo() {
    setValue('email', 'demo@taskflow.dev', { shouldValidate: true });
    setValue('password', 'demo1234', { shouldValidate: true });
  }

  return (
    <div className="aurora relative flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-center text-3xl font-bold tracking-tight">
            Welcome <span className="gradient-text">back</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to manage your tasks and stay on top of your day.
          </p>
        </div>

        <div className="glass rounded-2xl border border-border/60 p-6 shadow-xl">
          <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner /> : <LogIn className="h-4 w-4" />}
              Sign in
            </Button>

            <Button type="button" variant="ghost" className="w-full text-sm" onClick={fillDemo}>
              <Sparkles className="h-4 w-4" />
              Try the demo account
            </Button>
          </form>

          <div className="mt-6 border-t border-border/60 pt-4 text-center text-sm text-muted-foreground">
            New here?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo account: <span className="font-mono">demo@taskflow.dev / demo1234</span>
        </p>
      </motion.div>
    </div>
  );
}

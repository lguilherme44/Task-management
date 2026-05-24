import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function NotFoundPage() {
  return (
    <div className="aurora flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <div>
        <h1 className="text-6xl font-bold tracking-tight gradient-text">404</h1>
        <p className="mt-2 text-muted-foreground">This page slipped past your task list.</p>
      </div>
      <Button asChild variant="gradient">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuthStore } from '@/lib/auth-store';

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden text-sm text-muted-foreground sm:inline-block">
              Hi, <span className="font-medium text-foreground">{user.name.split(' ')[0]}</span>
            </span>
          )}
          <Button
            variant="gradient"
            size="sm"
            onClick={() => navigate('/task/new')}
            className="hidden sm:inline-flex"
          >
            <Plus className="h-4 w-4" />
            New task
          </Button>
          <Button
            variant="gradient"
            size="icon"
            onClick={() => navigate('/task/new')}
            className="sm:hidden"
            aria-label="New task"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

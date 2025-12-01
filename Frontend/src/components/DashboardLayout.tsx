import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Receipt,
  FileText,
  Home,
  Calendar,
  Book,
  Library,
  Menu,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Informações Pessoais', icon: User, path: '/dashboard/informacoes', color: 'text-blue-500' },
  { title: 'Mensagem', icon: Home, path: '/dashboard/mensagem', color: 'text-teal-500' },
  { title: 'Horários', icon: Calendar, path: '/dashboard/horarios', color: 'text-cyan-500' },
  { title: 'Histórico Escolar', icon: FileText, path: '/dashboard/historico', color: 'text-gray-500' },
  { title: 'Biblioteca', icon: Library, path: '/dashboard/biblioteca', color: 'text-amber-600' },
  { title: 'Secretaria On-line', icon: Book, path: '/dashboard/secretaria', color: 'text-amber-700' },
  { title: 'Boletos/Extrato', icon: Receipt, path: '/dashboard/boletos', color: 'text-gray-400' },
];

const pedagogicalItems = [
  { title: 'Calendário de Atividades', icon: Calendar, path: '/dashboard/calendario' },
  { title: 'Acompanhamento de atividades', icon: FileText, path: '/dashboard/acompanhamento' },
  { title: 'Blog Acadêmico', icon: Book, path: '/dashboard/blog' },
  { title: 'Boletins', icon: FileText, path: '/dashboard/boletins' },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      const item = [...menuItems, ...pedagogicalItems].find(item => item.path === path);
      return {
        title: item?.title || segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
        isLast: index === segments.length - 1,
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">META</span>
              <span className="text-xs text-muted-foreground ml-2">| Portal do Aluno</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.nome.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.nome}</span>
                <span className="text-xs text-muted-foreground">{user?.matricula}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            'bg-primary text-primary-foreground w-64 flex-shrink-0 transition-all duration-300 border-r overflow-y-auto',
            !sidebarOpen && 'w-0 lg:w-0 -ml-64 lg:-ml-64'
          )}
        >
          <div className="p-4">
            {/* User Info */}
            <div className="bg-primary-foreground/10 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-background text-primary">
                    {user?.nome.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Matrícula</p>
                  <p className="text-xs opacity-90 truncate">{user?.curso}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-primary-foreground/20 font-medium'
                        : 'hover:bg-primary-foreground/10'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', item.color)} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Pedagogical Section */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase opacity-60 px-3 mb-2">
                Informações Pedagógicas
              </h3>
              <nav className="space-y-1">
                {pedagogicalItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-primary-foreground/20 font-medium'
                          : 'hover:bg-primary-foreground/10'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="bg-card border-b px-6 py-3">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center">
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {crumb.isLast ? (
                          <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={crumb.path}>{crumb.title}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  Users,
  ChevronLeft,
  ChevronRight,
  Rocket
} from 'lucide-react';

interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  className?: string;
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/active-r-f-ps', label: 'Active RFPs', icon: Briefcase },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/clients', label: 'Clients', icon: Users },
];

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ isCollapsed, setIsCollapsed, className }) => {
  console.log('CollapsibleSidebar loaded');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={cn(
      "relative hidden border-r bg-muted/40 md:flex flex-col transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64",
      className
    )}>
      <div className="flex h-16 items-center px-6 border-b">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Rocket className="h-6 w-6 text-primary" />
          <span className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
            RFPStream
          </span>
        </NavLink>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive(item.href) && 'bg-muted text-primary',
                  isCollapsed && 'justify-center'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className={cn('whitespace-nowrap', isCollapsed && 'sr-only')}>
                  {item.label}
                </span>
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-full justify-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;
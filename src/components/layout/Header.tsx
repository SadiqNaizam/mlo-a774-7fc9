import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Menu,
  Rocket
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
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  console.log('Header loaded');

  // Placeholder for mobile navigation links
  const mobileNavLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/active-r-f-ps', label: 'Active RFPs' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/clients', label: 'Clients' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Rocket className="h-6 w-6 text-primary" />
              <span className="sr-only">RFPStream</span>
            </Link>
            {mobileNavLinks.map(link => (
                <Link key={link.label} to={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
                <Rocket className="h-6 w-6 text-primary md:hidden" />
                <span className="font-bold text-lg md:hidden">RFPStream</span>
            </Link>
          </div>

        <div className="ml-auto flex-1 sm:flex-initial">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search RFPs, clients..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
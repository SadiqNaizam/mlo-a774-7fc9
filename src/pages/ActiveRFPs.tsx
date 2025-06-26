import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import KanbanBoard from '@/components/KanbanBoard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Icons
import { MoreHorizontal, PlusCircle } from 'lucide-react';

// Mock data for the table view, derived from Kanban data
const rfpsForTable = [
  { id: 'rfp-1', title: 'Cloud Infrastructure Overhaul', company: 'Innovate Corp', value: 250000, dueDate: '2024-09-15', status: 'New' },
  { id: 'rfp-2', title: 'Cybersecurity Solutions', company: 'SecureNet', value: 120000, dueDate: '2024-09-20', status: 'New' },
  { id: 'rfp-3', title: 'Data Analytics Platform', company: 'DataDriven Inc.', value: 350000, dueDate: '2024-08-30', status: 'In Progress' },
  { id: 'rfp-4', title: 'Website Redesign', company: 'Creative Solutions', value: 80000, dueDate: '2024-08-10', status: 'Submitted' },
  { id: 'rfp-5', title: 'Managed IT Services', company: 'TechPro', value: 150000, dueDate: '2024-07-20', status: 'Won' },
  { id: 'rfp-6', title: 'E-commerce Platform', company: 'RetailGiant', value: 200000, dueDate: '2024-07-15', status: 'Lost' },
];

const ActiveRFPs = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log('ActiveRFPs page loaded');

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'Won':
        return 'default'; // Greenish in default theme
      case 'In Progress':
        return 'secondary'; // Blueish
      case 'Submitted':
        return 'outline'; // Neutral
      case 'Lost':
        return 'destructive'; // Red
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-2xl">Active RFPs</h1>
            <Link to="/r-f-p-detail-submission">
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add RFP
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="kanban" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="kanban">Kanban View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            <TabsContent value="kanban" className="flex-1 -mx-4">
              <KanbanBoard />
            </TabsContent>
            <TabsContent value="table" className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>RFP Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RFP Title</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden md:table-cell">Value</TableHead>
                        <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rfpsForTable.map((rfp) => (
                        <TableRow key={rfp.id}>
                          <TableCell className="font-medium">{rfp.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{rfp.company}</TableCell>
                          <TableCell className="hidden md:table-cell">${rfp.value.toLocaleString()}</TableCell>
                          <TableCell className="hidden sm:table-cell">{rfp.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(rfp.status)}>{rfp.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link to="/r-f-p-detail-submission">View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ActiveRFPs;
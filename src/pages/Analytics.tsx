import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock Data for Charts
const winLossData = [
  { reason: 'Price', won: 40, lost: 24 },
  { reason: 'Features', won: 30, lost: 14 },
  { reason: 'Timeline', won: 20, lost: 38 },
  { reason: 'Relationship', won: 27, lost: 8 },
  { reason: 'Other', won: 18, lost: 13 },
];

const submissionTrendData = [
  { month: 'Jan', submitted: 30, value: 240000 },
  { month: 'Feb', submitted: 20, value: 180000 },
  { month: 'Mar', submitted: 27, value: 310000 },
  { month: 'Apr', submitted: 18, value: 150000 },
  { month: 'May', submitted: 23, value: 290000 },
  { month: 'Jun', submitted: 34, value: 450000 },
];

const statusBreakdownData = [
  { name: 'Won', value: 400 },
  { name: 'Lost', value: 300 },
  { name: 'In Progress', value: 150 },
  { name: 'Submitted', value: 200 },
];
const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const Analytics = () => {
  console.log('Analytics page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CollapsibleSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'sm:pl-20' : 'sm:pl-64'}`}>
        <Header />
        <main className="flex-1 grid auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Select defaultValue="overview">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a report" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="overview">Performance Overview</SelectItem>
                            <SelectItem value="clients">Client Analysis</SelectItem>
                            <SelectItem value="trends">Trend Analysis</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Date Range</span>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>RFP Win/Loss Reasons</CardTitle>
                        <CardDescription>Analysis of why proposals are won or lost.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer className="h-[300px]" config={{}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={winLossData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="reason" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Bar dataKey="won" fill="#16a34a" name="Won" />
                                    <Bar dataKey="lost" fill="#dc2626" name="Lost" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>RFP Submission Trend</CardTitle>
                        <CardDescription>Monthly submission volume and total value.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer className="h-[300px]" config={{}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={submissionTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="submitted" stroke="#8884d8" name="Submissions" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Overall RFP Status Breakdown</CardTitle>
                        <CardDescription>A summary of all RFPs in the pipeline.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <ChartContainer className="h-[300px] w-full" config={{}}>
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Pie
                                    data={statusBreakdownData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {statusBreakdownData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Future Chart</CardTitle>
                        <CardDescription>This space is reserved for another key metric.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[300px] bg-slate-50 rounded-lg">
                        <p className="text-muted-foreground">Chart coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';
import { FileText, Target, DollarSign, Users } from 'lucide-react';

const rfpValueData = [
  { name: 'Incoming', value: 120000 },
  { name: 'In Progress', value: 350000 },
  { name: 'Submitted', value: 275000 },
  { name: 'Won', value: 550000 },
];

const submissionTrendData = [
  { month: 'Jan', submitted: 12, won: 7 },
  { month: 'Feb', submitted: 19, won: 10 },
  { month: 'Mar', submitted: 15, won: 9 },
  { month: 'Apr', submitted: 22, won: 15 },
  { month: 'May', submitted: 18, won: 11 },
  { month: 'Jun', submitted: 25, won: 18 },
];

const Dashboard = () => {
  console.log('Dashboard loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollapsibleSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:p-6 bg-muted/40">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Metric Cards Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <MetricCard
              title="Active RFPs"
              value="24"
              trend={5.2}
              icon={FileText}
              path="/active-r-f-ps" // Path from App.tsx
            />
            <MetricCard
              title="Win Rate"
              value="68%"
              trend={-1.5}
              icon={Target}
              path="/analytics" // Path from App.tsx
            />
            <MetricCard
              title="Total Pipeline Value"
              value="$1.2M"
              trend={12}
              icon={DollarSign}
              path="/analytics" // Path from App.tsx
            />
            <MetricCard
              title="Active Clients"
              value="89"
              trend={2}
              icon={Users}
              path="/clients" // Path from App.tsx
            />
          </section>

          {/* Charts Section */}
          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>RFP Value by Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={rfpValueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Pipeline Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submissions & Wins Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={submissionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="submitted" stroke="#8884d8" name="Submitted" />
                      <Line type="monotone" dataKey="won" stroke="#82ca9d" name="Won" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
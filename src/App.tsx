import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ActiveRFPs from "./pages/ActiveRFPs";
import Analytics from "./pages/Analytics";
import Clients from "./pages/Clients";
import Dashboard from "./pages/Dashboard";
import RFPDetailSubmission from "./pages/RFPDetailSubmission";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboard />} />
          <Route path="/active-r-f-ps" element={<ActiveRFPs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/r-f-p-detail-submission" element={<RFPDetailSubmission />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;

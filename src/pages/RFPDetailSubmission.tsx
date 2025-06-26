import React, { useState } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// Page-specific Component
import MultiStepFormWizard from '@/components/MultiStepFormWizard';

const RFPDetailSubmission = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log('RFPDetailSubmissionPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/*
            This page is dual-purpose. 
            For creating a new RFP, we render the MultiStepFormWizard.
            For viewing an existing RFP, you would conditionally render a detail view component here
            based on a URL parameter (e.g., /r-f-p-detail-submission/123).
          */}
          <MultiStepFormWizard />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RFPDetailSubmission;
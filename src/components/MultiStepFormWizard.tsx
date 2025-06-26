import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

// Define the validation schema for the entire form using Zod
const formSchema = z.object({
  rfpTitle: z.string().min(5, 'Title must be at least 5 characters'),
  clientName: z.string().min(2, 'Client name is required'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
  submissionRequirements: z.string().min(10, 'Please outline submission requirements'),
  teamNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, name: 'RFP Details', fields: ['rfpTitle', 'clientName', 'dueDate'] },
  { id: 2, name: 'Requirements', fields: ['submissionRequirements', 'teamNotes'] },
  { id: 3, name: 'Review & Submit' },
];

const MultiStepFormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  console.log('MultiStepFormWizard loaded');

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const processForm: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted:', data);
    toast({
      title: "RFP Submitted Successfully!",
      description: "The RFP details have been saved.",
    });
    // Here you would typically make an API call
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields as (keyof FormValues)[];
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New RFP Submission</CardTitle>
        <CardDescription>Follow the steps to add a new RFP to the system.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${
                    currentStep > index ? 'bg-green-600' : currentStep === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  {currentStep > index ? <Check size={24} /> : step.id}
                </div>
                <p className={`mt-2 text-sm text-center ${currentStep >= index ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>{step.name}</p>
              </div>
              {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${currentStep > index ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit(processForm)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rfpTitle">RFP Title</Label>
                    <Input id="rfpTitle" {...register('rfpTitle')} placeholder="e.g., Q3 Enterprise Software Upgrade" />
                    {errors.rfpTitle && <p className="text-red-500 text-sm mt-1">{errors.rfpTitle.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input id="clientName" {...register('clientName')} placeholder="e.g., Acme Corporation" />
                    {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" {...register('dueDate')} />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
                  </div>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                   <div>
                    <Label htmlFor="submissionRequirements">Submission Requirements</Label>
                    <Textarea id="submissionRequirements" {...register('submissionRequirements')} placeholder="Describe the key requirements, formats, and deadlines for the submission." />
                    {errors.submissionRequirements && <p className="text-red-500 text-sm mt-1">{errors.submissionRequirements.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="teamNotes">Internal Team Notes (Optional)</Label>
                    <Textarea id="teamNotes" {...register('teamNotes')} placeholder="Add any notes for your team..." />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Review Your Submission</h3>
                    <div className="space-y-2 p-4 border rounded-md bg-gray-50">
                        <p><strong>Title:</strong> {getValues('rfpTitle')}</p>
                        <p><strong>Client:</strong> {getValues('clientName')}</p>
                        <p><strong>Due Date:</strong> {getValues('dueDate')}</p>
                        <p><strong>Requirements:</strong> {getValues('submissionRequirements')}</p>
                        <p><strong>Notes:</strong> {getValues('teamNotes') || 'N/A'}</p>
                    </div>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrev} variant="outline" disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit(processForm)} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit RFP'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiStepFormWizard;
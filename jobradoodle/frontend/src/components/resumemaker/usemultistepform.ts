import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);
    
    
    function next() {
        setCurrentStep(i => {
            if (i < steps.length - 1) {
                return i + 1;
            }
            return i;
        });
    }

    function previous() {
        setCurrentStep(i => {
            if (i <= 0) return i;
            return i - 1;
        })
    }

    function goTo(step: number) {
        if (step < 0 || step >= steps.length) return;
        setCurrentStep(step);
    }


 

  return {
    currentStep,
    step: steps[currentStep],
    goTo,
    next,
    previous,
    steps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
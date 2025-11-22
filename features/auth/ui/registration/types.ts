export interface RegistrationStep {
  id: number;
  title: string;
  description?: string;
  component: React.ComponentType<StepComponentProps>;
}

export interface StepComponentProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  icon: 'standard' | 'premium';
  features: string[];
}

export type EngagementType = '1-year' | 'no-commitment';

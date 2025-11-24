import { ActionResult } from "@/shared/types/actions";
import { SubscriptionPlan, User, Document } from "@prisma/client";

export interface RegistrationStep {
  id: number;
  title: string;
  description?: string;
  component: React.ComponentType<StepComponentProps>;
}


type SafeUser = Omit<User, 'password' | 'googleId'>;
export interface StepComponentProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  updateUserSubscription: (plan: SubscriptionPlan) => Promise<ActionResult<SafeUser>>;
  uploadDocumentFile: (formData: FormData) => Promise<ActionResult<Document>>;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  icon: 'standard' | 'premium';
  features: string[];
}

export type EngagementType = '1-year' | 'no-commitment';

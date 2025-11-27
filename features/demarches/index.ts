// Actions
export { 
  getUserDemarchesAction,
  getDemarcheStatsAction,
  startNewDemarcheAction,
  updateDemarcheAction,
  getAvailableModelesAction,
  deleteDemarcheAction,
} from './actions';

// Services
export { demarcheService, DemarcheService } from './services/demarche.service';

// Types & Schemas
export type {
  DemarcheCardProps,
  DemarcheListItem,
  DemarcheStats,
  DemarcheDocuments,
} from './types/schemas';
export {
  StartDemarcheSchema,
  UpdateDemarcheSchema,
  DemarcheFilterSchema,
} from './types/schemas';

// UI Components
export { DemarcheCard } from './ui/components/DemarcheCard';
export { DemarcheGrid } from './ui/components/DemarcheGrid';
export { DemarchesPage } from './ui/pages/DemarchesPage';
export { DemarcheViewPage } from './ui/pages/DemarcheViewPage';
export { CreateDemarcheDialog } from './ui/CreateDemarcheDialog';

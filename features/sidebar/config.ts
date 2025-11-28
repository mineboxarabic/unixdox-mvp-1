import { 
  LuHouse, 
  LuFolderOpen, 
  LuFileText, 
  LuClock,
  LuLogOut,
  LuSettings,
  LuCircleHelp 
} from 'react-icons/lu';
import { NavItem, StorageInfo } from './types';

export const mainNavItems: NavItem[] = [
  {
    label: 'Accueil',
    icon: LuHouse,
    href: '/',
    isActive: true,
  },
  {
    label: 'Démarches',
    icon: LuFolderOpen,
    href: '/demarches',
    badge: 2,
  },
  {
    label: 'Mes documents',
    icon: LuFileText,
    href: '/documents',
    badge: 2,
  },
  {
    label: 'Echéances',
    icon: LuClock,
    href: '/echeances',
    badge: 2,
  },
];

export const bottomNavItems: NavItem[] = [
  {
    label: 'Déconnexion',
    icon: LuLogOut,
    href: '#',
  },
  {
    label: 'Paramètres',
    icon: LuSettings,
    href: '/settings',
  },
  {
    label: 'Aide',
    icon: LuCircleHelp,
    href: '/help',
  },
];

export const storageInfo: StorageInfo = {
  used: 1.5,
  total: 6,
  unit: 'Go',
};

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
  },
  {
    label: 'Mes documents',
    icon: LuFileText,
    href: '/documents',
  },
  {
    label: 'Echéances',
    icon: LuClock,
    href: '/echeances',
    isPremium: true, // Premium-only feature
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

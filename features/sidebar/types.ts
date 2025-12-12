export interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
  badge?: number;
  isPremium?: boolean;
  isDisabled?: boolean;
}

export interface UserAccount {
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: string;
  isPremium?: boolean;
}

export interface StorageInfo {
  used: number;
  total: number;
  unit: 'Go' | 'GB' | 'Mo' | 'MB';
}

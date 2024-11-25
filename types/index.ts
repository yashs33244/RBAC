export type Role = 'ADMIN' | 'MODERATOR' | 'USER';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
}

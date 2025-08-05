export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AlertType {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
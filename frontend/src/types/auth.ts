export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

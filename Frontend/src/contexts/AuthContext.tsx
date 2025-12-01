import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  matricula: string;
  nome: string;
  curso: string;
}

interface AuthContextType {
  user: User | null;
  login: (matricula: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (matricula: string, senha: string): Promise<boolean> => {
    // Simulação de login - em produção, conectaria ao backend
    if (matricula && senha) {
      const userData = {
        matricula,
        nome: 'Estudante',
        curso: 'BACHARELADO EM ENGENHARIA DE COMPUTAÇÃO',
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

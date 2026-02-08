'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from './design-types';
import { clearToken, setToken } from './auth';
import { fetchMe, login as apiLogin, register as apiRegister } from './api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, targetGrade?: string) => Promise<void>;
  logout: () => void;
  updateTargetGrade: (grade: string) => void;
  updateTargetProfession: (profession: string) => void;
  updateDDaTRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'csp_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
      return;
    }

    fetchMe()
      .then((me) => {
        setUser(me);
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(me));
      })
      .catch(() => {
        clearToken();
      });
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    if (data?.token) {
      setToken(data.token);
    }
    setUser(data?.user ?? null);
    if (typeof window !== 'undefined' && data?.user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    }
  };

  const register = async (name: string, email: string, password: string, targetGrade?: string) => {
    const data = await apiRegister(name, email, password);
    if (data?.token) {
      setToken(data.token);
    }
    const nextUser = data?.user
      ? { ...data.user, targetGrade }
      : null;
    setUser(nextUser);
    if (typeof window !== 'undefined' && nextUser) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const updateTargetGrade = (grade: string) => {
    if (!user) return;
    const updated = { ...user, targetGrade: grade, updatedAt: new Date().toISOString() };
    setUser(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const updateTargetProfession = (profession: string) => {
    if (!user) return;
    const updated = { ...user, targetProfession: profession, updatedAt: new Date().toISOString() };
    setUser(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const updateDDaTRole = (role: string) => {
    if (!user) return;
    const updated = { ...user, ddaTRole: role, updatedAt: new Date().toISOString() };
    setUser(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateTargetGrade,
      updateTargetProfession,
      updateDDaTRole,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

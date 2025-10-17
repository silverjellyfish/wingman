import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '@/types';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
} from 'firebase/auth';

import type { User as FirebaseUser } from 'firebase/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
    };
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(mapFirebaseUser(userCredential.user));
  };

  const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    setUser(mapFirebaseUser(userCredential.user));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const deleteAccount = async (userId: string) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_BASE_URL}/users/firebase/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await res.text();
      console.log("Delete response text:", text);
      if (!res.ok) throw new Error("Failed to delete user from backend");
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }
      setUser(null);
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    deleteAccount,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

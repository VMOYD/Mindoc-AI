import { createContext, useState, useCallback, useEffect } from 'react';

// Create the context
interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSignInOpen: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  openSignIn: () => void;
  closeSignIn: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isSignInOpen: false,
  signIn: async () => { throw new Error('signIn not implemented'); },
  signOut: async () => { throw new Error('signOut not implemented'); },
  openSignIn: () => { throw new Error('openSignIn not implemented'); },
  closeSignIn: () => { throw new Error('closeSignIn not implemented'); },
});

import type { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  
  // Check for existing session on mount
  useEffect(() => {
    // In a real app, this would check for an existing token in localStorage
    // or make an API call to validate the session
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('showroom_user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          console.log('%c✓ User session restored', 'color: #38bdf8; font-weight: bold;');
        }
      } catch (error) {
        console.log('%c✗ Session restoration failed', 'color: #fb7185; font-weight: bold;');
        // Clear potentially corrupted data
        localStorage.removeItem('showroom_user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);
  
  // Sign in function
  interface SignInParams {
    email: string;
    password: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
  }

  const signIn = useCallback(
    async (email: string, password: string): Promise<User> => {
      // In a real app, this would make an API call to authenticate
      setIsLoading(true);

      try {
        // Simulate API call delay
        await new Promise<void>(resolve => setTimeout(resolve, 1000));

        // For demo purposes, any non-empty credentials will work
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // Create a mock user object
        const userData: User = {
          id: 'usr_' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`
        };

        // Save user data to localStorage for persistence
        localStorage.setItem('showroom_user', JSON.stringify(userData));

        // Update state
        setUser(userData);
        setIsSignInOpen(false);

        console.log('%c➜ User signed in successfully', 'color: #4ade80; font-weight: bold;');

        return userData;
      } catch (error) {
        console.log('%c✗ Sign in failed', 'color: #fb7185; font-weight: bold;', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  
  // Sign out function
  const signOut = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user data from localStorage
      localStorage.removeItem('showroom_user');
      
      // Update state
      setUser(null);
      
      console.log('%c↩ User signed out', 'color: #a78bfa; font-weight: bold;');
    } catch (error) {
      console.log('%c✗ Sign out failed', 'color: #fb7185; font-weight: bold;', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Open sign in modal
  const openSignIn = useCallback(() => {
    setIsSignInOpen(true);
  }, []);
  
  // Close sign in modal
  const closeSignIn = useCallback(() => {
    setIsSignInOpen(false);
  }, []);
  
  // Create the context value object
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isSignInOpen,
    signIn,
    signOut,
    openSignIn,
    closeSignIn
  };
  
  // Return the provider with the value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// /src/store/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../superBaseClient.js'; // Import our Supabase client

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // This function checks the current authentication state when the app loads
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      // Check if the logged-in user is an admin
      // In a real app, you'd check a 'role' column in your profiles table
      if (session?.user && session.user.email === 'admin@one-way.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false); // Finished loading
    };
    getSession();
    // Supabase's onAuthStateChange listener is the magic part.
    // It listens for login, logout, and token refresh events.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && session.user.email === 'mwebsite444@gamil.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // The 'value' object passed to consumers.
  // It now includes Supabase's own auth methods.
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    isAdmin
  };

  // Render children only when not loading to avoid flickering
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
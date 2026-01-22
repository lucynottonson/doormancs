"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('../components/AuthForm'), { ssr: false });
const ProfileSetupFlow = dynamic(() => import('../components/ProfileSetupFlow'), { ssr: false });

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<'auth' | 'profile' | 'main'>('auth');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN' && session?.user) {
        checkUserStatus();
      } else if (event === 'SIGNED_OUT') {
        setCurrentView('auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      
      console.log('Checking user status:', user ? 'User found' : 'No user');
      console.log('User metadata:', user?.user_metadata);
      
      if (!user) {
        setCurrentView('auth');
        setLoading(false);
        return;
      }

      const profileCompleted = user.user_metadata?.profile_completed || false;
      
      console.log('Profile completed:', profileCompleted);
      
      if (profileCompleted) {
        router.push('/');
      } else {
        setCurrentView('profile');
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setCurrentView('auth');
    }
    
    setLoading(false);
  };

  const handleNewUserSignUp = () => {
    console.log('New user signed up, showing profile setup');
    setCurrentView('profile');
  };

  const handleLogin = () => {
    console.log('User logged in, redirecting to home');
    router.push('/');
  };

  const handleProfileComplete = () => {
    console.log('Profile completed, redirecting to home');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container section-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      {currentView === 'auth' && (
        <AuthForm 
          onNewUserSignUp={handleNewUserSignUp}
          onLogin={handleLogin}
        />
      )}

      {currentView === 'profile' && (
        <ProfileSetupFlow onComplete={handleProfileComplete} />
      )}
    </div>
  );
}
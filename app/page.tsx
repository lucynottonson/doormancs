"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import AuthForm from './components/AuthForm';
import ProfileSetupFlow from './components/ProfileSetupFlow';

export default function Home() {
  const [currentView, setCurrentView] = useState<'auth' | 'profile' | 'main'>('auth');
  const [loading, setLoading] = useState(true);

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
        setCurrentView('main');
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
    console.log('User logged in, checking status');
    checkUserStatus();
  };

  const handleProfileComplete = () => {
    console.log('Profile completed, showing main view');
    setCurrentView('main');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentView('auth');
  };

  if (loading) {
    return (
      <main style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5' 
      }}>
        <div>HOLD ON.........</div>
      </main>
    );
  }

  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5' 
    }}>
      <div style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
        {currentView === 'auth' && (
          <AuthForm 
            onNewUserSignUp={handleNewUserSignUp}
            onLogin={handleLogin}
          />
        )}

        {currentView === 'profile' && (
          <ProfileSetupFlow onComplete={handleProfileComplete} />
        )}

        {currentView === 'main' && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h1>Thank. You exist on website.</h1>
            <p>Your profile is complete and you're all set.</p>
            <button 
              onClick={handleSignOut}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import UsernameGenerator from './UsernameGenerator';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.display_name) {
        setUserDisplayName(user.user_metadata.display_name);
      }
    }
    checkUser();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (isSignUp) {
      // 1. SIGN UP
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            display_name: username,
            username: username 
          } 
        }
      });

      if (authError) {
        setError(authError.message);
      } else if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: authData.user.id, username: username }]);

        if (profileError) {
          setError("Profile table failed, but account created: " + profileError.message);
        } else {
          setUserDisplayName(username);
          console.log("Hello, " + username);
        }
      }
    } else {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (loginError) {
        setError(loginError.message);
      } else if (loginData.user) {
        setUserDisplayName(loginData.user.user_metadata.display_name);
      }
    }
    setLoading(false);
  };

  if (userDisplayName) {
    return (
      <div className="auth-card">
        <h2>Welcome, {userDisplayName}!</h2>
        <p>You are now logged in.</p>
        <button onClick={async () => {
          await supabase.auth.signOut();
          setUserDisplayName(null);
        }}>Log Out</button>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        
        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {isSignUp && (
          <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
            <UsernameGenerator onGenerate={setUsername} />
            <p>Selected: <strong>{username}</strong></p>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>

        {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
        
        <button 
          type="button" 
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
        </button>
      </form>
    </div>
  );
}
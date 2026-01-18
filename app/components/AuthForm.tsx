"use client";

import { useState } from 'react';
import { supabase } from "@/lib/supabase/client";
import UsernameGenerator from './UsernameGenerator';

interface AuthFormProps {
  onNewUserSignUp?: () => void;
  onLogin?: () => void;
}

export default function AuthForm({ onNewUserSignUp, onLogin }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (isSignUp) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            display_name: username,
            username: username,
            profile_completed: false
          } 
        }
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        console.log("New user created: " + username);
        setLoading(false);
        
        if (onNewUserSignUp) {
          onNewUserSignUp();
        }
      }
    } else {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (loginData.user) {
        console.log("da user logged in");
        setLoading(false);
        
        if (onLogin) {
          onLogin();
        }
      }
    }
  };

  return (
    <div className="auth-card">
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
        
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
          minLength={6}
        />

        {isSignUp && (
          <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
            <UsernameGenerator onGenerate={setUsername} />
          </div>
        )}

        <button type="submit" disabled={loading || (isSignUp && !username)}>
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>

        {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
        
        <button 
          type="button" 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
          }}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
        </button>
      </form>
    </div>
  );
}
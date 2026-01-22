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
    <div className="card card-color-2">
      <form onSubmit={handleAuth}>
        <h2 className="heading-md text-center mb-md">
          {isSignUp ? 'Create Account' : 'Log In'}
        </h2>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-input"
            placeholder="Enter your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength={6}
          />
        </div>

                {isSignUp && (
          <div className="content-box mb-md">
            <UsernameGenerator onGenerate={setUsername} />
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary mb-lg"
          disabled={loading || (isSignUp && !username)}
        >
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>

        {error && (
          <div className="alert alert-error mb-lg">
            {error}
          </div>
        )}
        
        <div className="section-center">
          <button 
            type="button" 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="btn-pill"
          >
            {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
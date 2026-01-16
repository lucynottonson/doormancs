"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import UsernameGenerator from "./UsernameGenerator";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignUp && !username) {
      setError("Generate Username!!");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      // 1. Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (authData.user) {
        // 2. Insert into the public profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user.id, 
              username: username 
            }
          ]);

        if (profileError) {
          setError("profile creation failed: " + profileError.message);
        } else {
          alert("Account created successfully!");
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    
    setLoading(false);
  } 

  return (
    <div className="auth-card">
      <h2>{isSignUp ? "Create an Account" : "Sign In"}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {isSignUp && (
          <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8rem', margin: '0 0 5px 0' }}>Pick a Username:</p>
            <UsernameGenerator onGenerate={setUsername} />
            {username && (
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Selected: <strong>{username}</strong>
              </p>
            )}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <hr style={{ margin: '20px 0' }} />

      <p style={{ textAlign: 'center' }}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button 
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
        >
          {isSignUp ? "Log In" : "Create one"}
        </button>
      </p>
    </div>
  );
}
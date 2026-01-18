"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ username?: string; avatar_url?: string; first_name?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    if (session?.user) {
      await fetchProfile(session.user.id);
    }
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, first_name')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error regarding profile:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <nav style={{
        backgroundColor: 'white',
        padding: '15px 30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Doorman Cognitive Sovereignty</h1>
        </Link>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {loading ? (
            <span>...</span>
          ) : user ? (
<Link href="/members/dashboard" style={{ textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'center' }}>              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #ddd'
                  }}
                />
              ) : (
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6c757d',
                  fontWeight: 700
                }}>
                  {(profile?.first_name || profile?.username || user.email || '').charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ color: '#666', fontWeight: '500' }}>
                {profile?.first_name || profile?.username || user.email}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth"
              style={{
                padding: '8px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 20px 0' }}>
            Welcome to Doorman Cognitive Sovereignty
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#666', margin: '0 0 40px 0' }}>
            This website is under construction
          </p>
        </div>

        <section style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          marginBottom: '40px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0 }}>About This Site</h2>
          <p>This is the public homepage. Everyone sees the same thing here.</p>
          <p>u have to sign in to see more stuff.</p>
        </section>
      </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ username?: string; avatar_url?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', userId)
          .single();

        if (error) {
          console.warn('No profile found:', error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setProfile(null);
      }
    };

    fetchProfile(user.id);
  }, [user]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    setLoading(false);
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
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Doorman Cognitive Sovereignty</h1>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {(profile?.avatar_url || user.user_metadata?.avatar_url) ? (
                <img
                  src={profile?.avatar_url || user.user_metadata?.avatar_url}
                  alt={`${profile?.username || user.email} avatar`}
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
                  {(profile?.username || user.user_metadata?.username || user.email || '').charAt(0).toUpperCase()}
                </div>
              )}

              <span style={{ color: '#666' }}>
                {profile?.username || user.user_metadata?.username || user.email}
              </span>
            </div>
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
              Log In
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
            Thank you for visiting Doorman Cognitive Sovereignty
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
          <h2 style={{ marginTop: 0 }}>Public Content</h2>
          <p>Anyone can see this page but on other pages u need account hehe</p>
        </section>

        {user ? (
          <section style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '2px solid #28a745'
          }}>
            <h2 style={{ marginTop: 0, color: '#28a745' }}>
            if anyone can see this at all its working
            </h2>
            <p>apparently this is invisible idk why</p>          </section>
        ) : (
          <section style={{
            backgroundColor: '#f8f9fa',
            padding: '40px',
            borderRadius: '12px',
            border: '2px dashed #ccc',
            textAlign: 'center'
          }}>
            <h2 style={{ marginTop: 0 }}>🔒 Members-Only Area</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Sign in to access exclusive content
            </p>
            <Link
              href="/auth"
              style={{
                display: 'inline-block',
                padding: '10px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              Log In to Access
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
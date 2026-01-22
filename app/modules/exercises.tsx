"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <main className="container">
          <div className="spinner"></div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="container">
        <div className="card card-color-1 mb-md" style={{ minHeight: 'auto' }}>
          <h1 className="heading-lg" style={{ margin: '0 0 10px 0' }}>
            Welcome back {profile?.first_name || profile?.username || 'friend'}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            This is where ur shit is gonna be when I make it
          </p>
        </div>

        <div className="grid">
          <div className="card card-color-2" style={{ minHeight: 'auto' }}>
            <h3 className="heading-md" style={{ marginTop: 0, color: 'var(--text-primary)' }}>
              something else
            </h3>
            <p>information about something else</p>
          </div>

          <div className="card card-color-3" style={{ minHeight: 'auto' }}>
            <h3 className="heading-md" style={{ marginTop: 0, color: 'var(--color-5)' }}>
              more
            </h3>
            <p>Another thing</p>
          </div>

          <div className="card card-color-4" style={{ minHeight: 'auto' }}>
            <h3 className="heading-md" style={{ marginTop: 0, color: 'var(--text-primary)' }}>
              other thing again
            </h3>
            <p>more thing</p>
          </div>
        </div>
      </main>
    </>
  );
}
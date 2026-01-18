"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AvatarRegenerator from '../../components/AvatarRegenerator';
export default function MyProfile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/');
      } else if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push('/auth');
      return;
    }

    setUser(session.user);
    await loadProfile(session.user.id);
    setLoading(false);
  };

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data);
      
      if (data.birthday) {
        const birthDate = new Date(data.birthday);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        
        setAge(calculatedAge);
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        ...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '30px',
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt="Your avatar"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #ddd'
              }}
            />
          ) : (
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#6c757d',
              fontWeight: 700,
              border: '4px solid #ddd'
            }}>
              {(profile?.username || '').charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <h1 style={{ margin: '0 0 10px 0' }}>
              {profile?.first_name} {profile?.last_initial}.
            </h1>
            <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '1.1rem' }}>
              @{profile?.username}
            </p>
            {age !== null && (
              <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>
                {age} years old
              </p>
            )}
          </div>
        </div>
{profile?.avatar_combination && (
  <div style={{
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  }}>
    <AvatarRegenerator
      userId={user.id}
      avatarParts={JSON.parse(profile.avatar_combination)}
      currentBackgroundSeed={profile.background_seed || profile.avatar_combination}
      onUpdate={() => loadProfile(user.id)}
    />
  </div>
)}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Your info</h2>
        </div>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #007bff'
            }}>
              <strong style={{ color: '#666', fontSize: '0.9rem' }}>Username</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.1rem' }}>{profile?.username}</p>
            </div>
            </div>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #007bff'
            }}>
              <strong style={{ color: '#666', fontSize: '0.9rem' }}>Full Name</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.1rem' }}>
                {profile?.first_name} {profile?.last_initial}.
              </p>
            </div>

            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #007bff'
            }}>
              <strong style={{ color: '#666', fontSize: '0.9rem' }}>Email</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.1rem' }}>{user?.email}</p>
            </div>

            {profile?.birthday && (
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                borderLeft: '4px solid #007bff'
              }}>
                <strong style={{ color: '#666', fontSize: '0.9rem' }}>Birthday</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '1.1rem' }}>
                  {new Date(profile.birthday).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  {age !== null && ` (${age} years old)`}
                </p>
              </div>
            )}

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Account Details</h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #28a745'
            }}>
              <strong style={{ color: '#666', fontSize: '0.9rem' }}>Member Since</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.1rem' }}>
                {new Date(user?.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #28a745'
            }}>
            </div>
          </div>
        </div>
    </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';

export default function UnifiedNav() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
    checkAdmin();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadProfile(session.user.id);
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
      await loadProfile(session.user.id);
    }
    setLoading(false);
  };

  const checkAdmin = async () => {
    const hasAccess = await isAdmin();
    setShowAdminLink(hasAccess);
  };

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('username, avatar_url, first_name')
      .eq('id', userId)
      .single();
    
    if (data) setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header>
      <Link href="/" className="brand-logo">
        DCS
      </Link>
      
      <nav className="nav">
        {/* Public links */}
        <Link href="#" className="nav-link">
          Manifesto
        </Link>
        <Link href="#" className="nav-link">
          Articles
        </Link>
        <Link href="#" className="nav-link">
          About
        </Link>

        {/* Member-only links */}
        {user && (
          <>
            <Link 
              href="/members/dashboard" 
              className="nav-link"
              style={{ 
                color: pathname?.startsWith('/members/dashboard') 
                  ? 'var(--accent-secondary)' 
                  : 'var(--accent-primary)'
              }}
            >
              Dashboard
            </Link>
            <Link 
              href="/members/journal" 
              className="nav-link"
              style={{ 
                color: pathname?.startsWith('/members/journal') 
                  ? 'var(--accent-secondary)' 
                  : 'var(--accent-primary)'
              }}
            >
              Journal
            </Link>
            <Link 
              href="/members/memberlist" 
              className="nav-link"
              style={{ 
                color: pathname?.startsWith('/members/memberlist') 
                  ? 'var(--accent-secondary)' 
                  : 'var(--accent-primary)'
              }}
            >
              Members
            </Link>
            {showAdminLink && (
              <Link 
                href="/members/admin" 
                className="nav-link"
                style={{ 
                  color: pathname?.startsWith('/members/admin') 
                    ? 'var(--accent-secondary)' 
                    : 'var(--accent-primary)'
                }}
              >
                Admin
              </Link>
            )}
          </>
        )}
      </nav>

      <div className="nav">
        {loading ? (
          <div className="spinner spinner-sm"></div>
        ) : user ? (
          <>
            <Link 
              href="/members/profile"
              className="nav-link"
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                padding: '5px 10px',
                borderRadius: '8px',
                backgroundColor: pathname?.startsWith('/members/profile') 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'transparent'
              }}
            >
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Avatar"
                  className="avatar avatar-sm"
                />
              ) : (
                <div className="avatar avatar-sm" style={{
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6c757d',
                  fontWeight: 700
                }}>
                  {(profile?.first_name || profile?.username || '').charAt(0).toUpperCase()}
                </div>
              )}
              <span>
                {profile?.first_name || profile?.username}
              </span>
            </Link>

            <button
              onClick={handleSignOut}
              className="btn btn-primary"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth" className="btn btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
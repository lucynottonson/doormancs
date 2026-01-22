"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';

export default function MembersNav() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const hasAccess = await isAdmin();
      setShowAdminLink(hasAccess);
    };
    
    loadProfile();
    checkAdmin();
  }, []);

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url, first_name')
        .eq('id', session.user.id)
        .single();
      
      if (data) setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/" className="brand-logo">
          DCS
        </Link>
        <nav className="nav">
          <Link 
            href="/members/dashboard" 
            className="nav-link"
            style={{ 
              color: pathname?.startsWith('/members/dashboard') ? 'var(--accent-secondary)' : 'var(--text-primary)'
            }}
          >
            Dashboard
          </Link>
          <Link 
            href="/members/journal" 
            className="nav-link"
            style={{ 
              color: pathname?.startsWith('/members/journal') ? 'var(--accent-secondary)' : 'var(--text-primary)'
            }}
          >
            Journal
          </Link>
          <Link 
            href="/members/memberlist" 
            className="nav-link"
            style={{ 
              color: pathname?.startsWith('/members/memberlist') ? 'var(--accent-secondary)' : 'var(--text-primary)'
            }}
          >
            Members
          </Link>
          {showAdminLink && (
            <Link 
              href="/members/admin" 
              className="nav-link"
              style={{ 
                color: pathname?.startsWith('/members/admin') ? 'var(--accent-primary)' : 'var(--text-primary)'
              }}
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link 
          href="/members/profile"
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            textDecoration: 'none',
            padding: '5px 10px',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            backgroundColor: pathname?.startsWith('/members/profile') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => {
            if (!pathname?.startsWith('/members/profile')) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
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
          <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
            {profile?.first_name || profile?.username}
          </span>
        </Link>

        <button
          onClick={handleSignOut}
          className="btn btn-primary"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-dark)'
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
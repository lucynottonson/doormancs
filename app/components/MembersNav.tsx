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

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '15px 30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', cursor: 'pointer' }}>DCS</h1>
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
         <Link 
  href="/members/dashboard" 
  style={{ 
    textDecoration: 'none', 
    color: pathname?.startsWith('/members/dashboard') ? '#007bff' : '#666', 
    fontWeight: '500' 
  }}
>
  Dashboard
</Link>
          <Link 
            href="/members/journal" 
            style={{ 
              textDecoration: 'none', 
              color: pathname?.startsWith('/members/journal') ? '#007bff' : '#666', 
              fontWeight: '500' 
            }}
          >
            Journal
          </Link>
          <Link 
            href="/members/memberlist" 
            style={{ 
              textDecoration: 'none', 
              color: pathname?.startsWith('/members/memberlist') ? '#007bff' : '#666', 
              fontWeight: '500' 
            }}
          >
            Members
          </Link>
          {showAdminLink && (
  <Link 
    href="/members/admin" 
    style={{ 
      textDecoration: 'none', 
      color: pathname?.startsWith('/members/admin') ? '#dc3545' : '#666', 
      fontWeight: '500' 
    }}
  >
    Admin
  </Link>
)}
        </div>
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
            backgroundColor: pathname?.startsWith('/members/profile') ? '#f0f0f0' : 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
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
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ddd'
              }}
            />
          ) : (
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontWeight: 700,
              border: '2px solid #ddd'
            }}>
              {(profile?.first_name || profile?.username || '').charAt(0).toUpperCase()}
            </div>
          )}
          <span style={{ color: '#666', fontWeight: '500' }}>
            {profile?.first_name || profile?.username}
          </span>
        </Link>

        <button
          onClick={handleSignOut}
          style={{
            padding: '8px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
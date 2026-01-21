"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/lib/admin';

export default function AdminBroadcast() {
  const [loading, setLoading] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push('/auth');
      return;
    }

    const hasAccess = await isAdmin();
    
    if (!hasAccess) {
      alert('Access Denied: Admin only');
      router.push('/members/dashboard');
      return;
    }

    setAdminAccess(true);
    setLoading(false);
  };

  if (!adminAccess) {
    return null;
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#666' }}>Test admin page</p>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
          </div>
        </div>
      </div>
    </main>
  );
}
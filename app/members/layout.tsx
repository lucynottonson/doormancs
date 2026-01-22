"use client";

import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';
import MembersNav from '../components/MembersNav';
import "./global.css";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push('/auth');
      return;
    }
    
    setLoading(false);
  };

 if (loading) {
  return (
    <div>
      Loading...
    </div>
  );
}

return (
  <div>
    <MembersNav />
    {children}
  </div>
);
  }

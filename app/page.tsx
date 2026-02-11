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
    <>
      <div className="container">

        <section className="section mb-xl">
          <h2 className="heading-lg text-center mb-md">This site is under active development!</h2>
          <h3>
            Please refer to the emails below for any inquiries:
          </h3>
        <section/>

        <section className="section mb-x;">
          <div className="accordion">
            <div className="accordion-content">
            </div>
          </div>
          </section>
        <section className="section mb-x;">


        </section>
          <div className="accordion">
            <button className="accordion-header">
             Get Involved 
              <span>team@doormancs.org</span>
            </button>
            <div className="accordion-content">
            </div>
          </div>

           <div className="accordion">
            <button className="accordion-header">
              Design
              <span>lucy@doormancs.org</span>
            </button>
            <div className="accordion-content">
            </div>
          </div>

           <div className="accordion">
            <button className="accordion-header">
              
              <span>Other</span>
              <span>
                admin@doormancs.org
              </span>
            </button>
            <div className="accordion-content">
            </div>
          </div>
        </section>

        <section className="section mb-x;">
          <h1>
            Updates will be posted here as they come.
          </h1>
        </section>
      </div>
    </>
  );
}
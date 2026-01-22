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
 

        <section className="section section-center">
          <h1 className="heading-xl">
            Heading
          </h1>
          <div className="content-box text-lead">
            subheader
          </div>
        </section>

        <div className="grid">
          <div className="card card-color-1">
            <div className="badge">01</div>
            <h3 className="heading-md">Thing 1</h3>
          </div>

          <div className="card card-color-2">
            <div className="badge">02</div>
            <h3 className="heading-md">Thing 2</h3>
          </div>

          <div className="card card-color-3">
            <div className="badge">03</div>
            <h3 className="heading-md">Thing 3</h3>
          </div>

          <div className="card card-color-4">
            <div className="badge">04</div>
            <h3 className="heading-md">Thing 4</h3>
          </div>

          <div className="card card-color-5">
            <div className="badge">05</div>
            <h3 className="heading-md">Thing 5</h3>
          </div>

          <div className="card card-color-6">
            <div className="badge">06</div>
            <h3 className="heading-md">Thing 6</h3>
          </div>
        </div>

        <section className="section-featured mb-xl">
          <h2 className="heading-lg text-center">more things</h2>
          <div className="flex-wrap">
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>
            <div className="btn-pill">thing</div>

          </div>
        </section>

        <section className="section mb-xl">
          <div className="grid-2">
            <div className="card card-color-1">
              <h3 className="heading-md">No number thing</h3>
            </div>

            <div className="card card-color-3">
              <h3 className="heading-md">No number thing</h3>
            </div>
          </div>
        </section>

        <section className="section mb-xl">
          <h2 className="heading-lg text-center mb-md">Other thing</h2>
          
          <div className="accordion">
            <button className="accordion-header">
              1
              <span>+</span>
            </button>
            <div className="accordion-content">
            </div>
          </div>

           <div className="accordion">
            <button className="accordion-header">
              1
              <span>+</span>
            </button>
            <div className="accordion-content">
            </div>
          </div>

           <div className="accordion">
            <button className="accordion-header">
              1
              <span>+</span>
            </button>
            <div className="accordion-content">
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-content">
            <p className="mt-sm">This site is under active development. More resources and tools coming soon.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
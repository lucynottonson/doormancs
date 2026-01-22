"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";

export default function MemberList() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setCurrentUser(session?.user);
    
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, first_name, last_initial, birthday')
      .eq('profile_completed', true)
      .order('username', { ascending: true });

    if (data) {
      const membersWithAge = data.map(member => {
        let age = null;
        if (member.birthday) {
          const birthDate = new Date(member.birthday);
          const today = new Date();
          age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
        }
        return { ...member, age };
      });
      
      setMembers(membersWithAge);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
          <div className="blob blob-5"></div>
        </div>
        
        <main className="container">
          <div className="spinner"></div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>

      <main className="container">
        <div className="card card-color-1 mb-md" style={{ minHeight: 'auto' }}>
          <h1 className="heading-lg" style={{ marginTop: 0 }}>All Members</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {members.length} {members.length === 1 ? 'member' : 'members'} so far
          </p>
        </div>

        <div className="grid">
          {members.map((member, index) => {
            const cardColors = ['card-color-2', 'card-color-3', 'card-color-4', 'card-color-5', 'card-color-6'];
            const colorClass = cardColors[index % cardColors.length];
            
            return (
              <div
                key={member.id}
                className={`card ${colorClass}`}
                style={{
                  textAlign: 'center',
                  minHeight: 'auto',
                  border: member.id === currentUser?.id ? '3px solid var(--accent-primary)' : 'none'
                }}
              >
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.username}
                    className="avatar avatar-lg"
                    style={{ margin: '0 auto 15px' }}
                  />
                ) : (
                  <div className="avatar avatar-lg" style={{
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '2rem',
                    color: '#6c757d',
                    fontWeight: 700
                  }}>
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <h3 className="heading-md" style={{ margin: '0 0 5px 0' }}>
                  {member.username}
                </h3>
                
                {member.age !== null && (
                  <p style={{ color: 'var(--text-secondary)', margin: '5px 0', fontSize: '0.9rem' }}>
                    Age: {member.age}
                  </p>
                )}
                
                {member.id === currentUser?.id && (
                  <span className="badge" style={{
                    position: 'static',
                    display: 'inline-block',
                    marginTop: '10px',
                    backgroundColor: 'var(--accent-primary)',
                    transform: 'rotate(0deg)'
                  }}>
                    YOU!!!
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {members.length === 0 && (
          <div className="card card-color-2" style={{
            textAlign: 'center',
            padding: '60px 30px',
            minHeight: 'auto'
          }}>
            <p style={{ color: 'var(--text-secondary)' }}>No members yet.</p>
          </div>
        )}
      </main>
    </>
  );
}
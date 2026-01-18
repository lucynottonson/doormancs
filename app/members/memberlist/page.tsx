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
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div>....</div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h1 style={{ marginTop: 0 }}>All Members</h1>
        <p style={{ color: '#666' }}>
          {members.length} {members.length === 1 ? 'member' : 'members'} so far
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center',
              border: member.id === currentUser?.id ? '2px solid #007bff' : '1px solid #ddd'
            }}
          >
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.username}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #ddd',
                  marginBottom: '15px'
                }}
              />
            ) : (
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
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
            
            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>
              {member.username}
            </h3>
            
            {member.age !== null && (
              <p style={{ color: '#666', margin: '5px 0', fontSize: '0.9rem' }}>
                Age: {member.age}
              </p>
            )}
            
            {member.id === currentUser?.id && (
              <span style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '4px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                YOU!!!
              </span>
            )}
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '60px 30px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>No members yet.</p>
        </div>
      )}
    </main>
  );
}
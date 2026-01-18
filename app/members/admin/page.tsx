"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/lib/admin';

export default function AdminBroadcast() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
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

const sendToAllMembers = async () => {
  if (!subject || !message) {
    alert('Please fill in both subject and message');
    return;
  }

  setSending(true);
  setStatus('Fetching member data...');

  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('profile_completed', true);

    console.log('Profiles query result:', profiles, profilesError);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      setStatus('Error fetching members: ' + profilesError.message);
      setSending(false);
      return;
    }

    if (!profiles || profiles.length === 0) {
      setStatus('No completed profiles found in database');
      setSending(false);
      return;
    }

    console.log(`Found ${profiles.length} profiles:`, profiles);
    setStatus(`Found ${profiles.length} profiles, fetching emails...`);

    // Get emails from API
    const response = await fetch('/api/get-member-emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileIds: profiles.map(p => p.id) })
    });

    console.log('API response status:', response.status);
    const data = await response.json();
    console.log('API response data:', data);

    if (!response.ok) {
      setStatus(`API Error: ${data.error || 'Unknown error'}`);
      setSending(false);
      return;
    }

    const { emails } = data;

    if (!emails || emails.length === 0) {
      setStatus(`No member emails found. API returned: ${JSON.stringify(data)}`);
      setSending(false);
      return;
    }

    console.log(`Got ${emails.length} emails:`, emails);
    setStatus(`Sending to ${emails.length} members...`);

    let successCount = 0;
    for (const email of emails) {
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>${subject}</h2>
                <div style="white-space: pre-wrap;">${message}</div>
                <br><br>
                <p style="color: #666; font-size: 14px;">
                  This email was sent to all members of Doorman Cognitive Sovereignty
                </p>
              </div>
            `
          })
        });

        if (emailResponse.ok) {
          successCount++;
          setStatus(`Sent ${successCount}/${emails.length}...`);
        } else {
          console.error('Failed to send to', email, await emailResponse.text());
        }
      } catch (err) {
        console.error(`Failed to send to ${email}:`, err);
      }
    }

    setStatus(` Successfully sent ${successCount} emails!`);
    setSubject('');
    setMessage('');
  } catch (error) {
    console.error('Error:', error);
    setStatus(' Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }

  setSending(false);
};

  if (loading) {
    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center' }}>Loading...</div>
      </main>
    );
  }

  if (!adminAccess) {
    return null;
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1>Email All Members</h1>
        <p style={{ color: '#666' }}>send email to everyone</p>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              disabled={sending}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              disabled={sending}
              rows={10}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            onClick={sendToAllMembers}
            disabled={sending}
            style={{
              padding: '12px 30px',
              backgroundColor: sending ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: sending ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            {sending ? 'Sending...' : 'Send to All Members'}
          </button>

          {status && (
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              borderLeft: '4px solid #007bff'
            }}>
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
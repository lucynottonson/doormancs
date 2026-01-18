"use client";

import { useState } from 'react';
import { supabase } from "@/lib/supabase/client";
import AvatarGenerator from './AvatarGenerator';

interface ProfileSetupFlowProps {
  onComplete?: () => void;
}

export default function ProfileSetupFlow({ onComplete }: ProfileSetupFlowProps) {
  const [step, setStep] = useState<'avatar' | 'profile'>(('avatar'));
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [avatarParts, setAvatarParts] = useState<any>(null);
  
  // Profile form states
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarGenerated = (blob: Blob, previewUrl: string, parts: any) => {
    setAvatarBlob(blob);
    setAvatarPreview(previewUrl);
    setAvatarParts(parts);
  };

  const handleAvatarNext = () => {
    if (!avatarBlob) {
      setError("you must create avatar first.");
      return;
    }
    setError(null);
    setStep('profile');
  };

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarBlob) return null;

    try {
      const fileName = `${userId}-${Date.now()}.png`;
      const filePath = `avatars/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarBlob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      return null;
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let session = null;
      let user = null;
      
      for (let i = 0; i < 3; i++) {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession?.user) {
          session = currentSession;
          user = currentSession.user;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log('Current user:', user);
      
      if (!user) {
        setError("This fucking error again. there is problem if you see this");
        setLoading(false);
        return;
      }

      let avatarUrl = null;
      if (avatarBlob) {
        console.log('Uploading avatar...');
        avatarUrl = await uploadAvatar(user.id);
        if (!avatarUrl) {
          console.error('Avatar upload failed');
          setError("Avatar upload failed, less bad error than that fucking other error");
        } else {
          console.log('Avatar uploaded:', avatarUrl);
        }
      }

      console.log('Updating profile...');
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          bio,
          location,
          website,
          interests,
          avatar_url: avatarUrl,
          avatar_combination: avatarParts ? JSON.stringify(avatarParts) : null,
          profile_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('BIG PROBLEM', updateError);
        setError(updateError.message);
      } else {
        console.log('Updating user metadata...');
        await supabase.auth.updateUser({
          data: { 
            profile_completed: true,
            avatar_url: avatarUrl
          }
        });

        console.log("You DID IT!");
        if (onComplete) {
          onComplete();
        }
      }
    } catch (err) {
      setError("something wrong");
      console.error('Profile submit error:', err);
    }
    
    setLoading(false);
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      
      if (user) {
        await supabase
          .from('profiles')
          .update({ profile_completed: true })
          .eq('id', user.id);

        await supabase.auth.updateUser({
          data: { profile_completed: true }
        });
      }

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error('Skip error:', err);
    }
    setLoading(false);
  };

  if (step === 'avatar') {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: 'white'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Step 1 of 2</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>Create Avatar</p>
        </div>

        <div style={{ 
          width: '100%', 
          height: '6px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '3px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: '50%', 
            height: '100%', 
            backgroundColor: '#007bff',
            transition: 'width 0.3s'
          }} />
        </div>

        <div style={{ 
          border: '2px dashed #ddd', 
          padding: '20px', 
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          <AvatarGenerator onAvatarGenerated={handleAvatarGenerated} />
        </div>

        {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
          
          <button 
            type="button"
            onClick={handleAvatarNext}
            style={{ 
              flex: 2,
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            Next: give me your personal info→
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      backgroundColor: 'white'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ margin: 0 }}>Step 2 of 2</h2>
        <p style={{ color: '#666', marginTop: '5px' }}>Complete Your Profile</p>
      </div>

      <div style={{ 
        width: '100%', 
        height: '6px', 
        backgroundColor: '#e0e0e0', 
        borderRadius: '3px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#007bff',
          transition: 'width 0.3s'
        }} />
      </div>

      {avatarPreview && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <img 
            src={avatarPreview} 
            alt="Your avatar" 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '8px',
              border: '2px solid #ddd'
            }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: '500' }}>Your Avatar</p>
            <button
              type="button"
              onClick={() => setStep('avatar')}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                fontSize: '14px',
                marginTop: '3px'
              }}
            >
              ← Change Avatar
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="bio" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="I only have bio right now. also none of this is real and if you make an account during this process I will delete in in supabase anyway."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #ccc',
              resize: 'vertical',
              fontSize: '14px'
            }}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="button"
            onClick={() => setStep('avatar')}
            disabled={loading}
            style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            ← Back
          </button>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              flex: 2,
              padding: '12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              fontSize: '16px',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Saving...' : '✓ Complete Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
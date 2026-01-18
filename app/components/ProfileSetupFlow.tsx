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
  
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [birthday, setBirthday] = useState('');
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

    if (lastInitial && lastInitial.length !== 1) {
      setError("Last initial must be exactly 1 letter");
      return;
    }

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
        setError("Session error. Please try logging in again.");
        setLoading(false);
        return;
      }

      let avatarUrl = null;
      if (avatarBlob) {
        console.log('Uploading avatar...');
        avatarUrl = await uploadAvatar(user.id);
        if (!avatarUrl) {
          console.error('Avatar upload failed');
          setError("Avatar upload failed, but continuing...");
        } else {
          console.log('Avatar uploaded:', avatarUrl);
        }
      }

      console.log('Updating profile...');
   const { error: updateError } = await supabase
  .from('profiles')
  .update({
    first_name: firstName,
    last_initial: lastInitial.toUpperCase(),
    birthday: birthday || null,
    avatar_url: avatarUrl,
    avatar_combination: avatarParts ? JSON.stringify(avatarParts) : null,
    background_seed: avatarParts ? JSON.stringify(avatarParts) : null,
    email: user.email, // Add this line
    profile_completed: true,
    updated_at: new Date().toISOString()
  })
  .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        setError(updateError.message);
      } else {
        console.log('Updating user metadata...');
        await supabase.auth.updateUser({
          data: { 
            profile_completed: true,
            avatar_url: avatarUrl
          }
        });

        console.log("Profile completed!");
        if (onComplete) {
          onComplete();
        }
      }
    } catch (err) {
      setError("Something wrong");
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
              flex: 1,
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
            Next: Give me ur personal information →
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
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label htmlFor="lastInitial" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Last Initial (1 letter only)
          </label>
          <input
            id="lastInitial"
            type="text"
            placeholder="X"
            value={lastInitial}
            onChange={(e) => setLastInitial(e.target.value.slice(0, 1).toUpperCase())}
            maxLength={1}
            style={{ 
              width: '60px', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #ccc',
              fontSize: '14px',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          />
        </div>

        <div>
          <label htmlFor="birthday" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #ccc',
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
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
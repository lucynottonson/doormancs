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
          email: user.email,
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
      <div className="container-narrow">
        <div className="card card-color-2">
          <div className="section-center mb-lg">
            <h2 className="heading-lg">Step 1 of 2</h2>
            <p className="text-secondary">Create Avatar</p>
          </div>

          <div className="progress-bar mb-xl">
            <div className="progress-fill" style={{ width: '50%' }} />
          </div>

          <div className="content-box mb-lg">
            <AvatarGenerator onAvatarGenerated={handleAvatarGenerated} />
          </div>

          {error && (
            <div className="alert alert-error mb-lg">
              {error}
            </div>
          )}

          <button 
            type="button"
            onClick={handleAvatarNext}
            className="btn btn-primary"
          >
            Next: Give me ur personal information →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <div className="card card-color-2">
        <div className="section-center mb-lg">
          <h2 className="heading-lg">Step 2 of 2</h2>
          <p className="text-secondary">Complete Your Profile</p>
        </div>

        <div className="progress-bar mb-xl">
          <div className="progress-fill" style={{ width: '100%' }} />
        </div>

        {avatarPreview && (
          <div className="content-box mb-lg">
            <div className="section-center">
              <img 
                src={avatarPreview} 
                alt="Your avatar" 
                className="avatar avatar-xl mb-md"
              />
              <p className="mb-sm">Your Avatar</p>
              <button
                type="button"
                onClick={() => setStep('avatar')}
                className="btn-pill"
              >
                ← Change Avatar
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleProfileSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastInitial" className="form-label">
              Last Initial (1 letter only)
            </label>
            <input
              id="lastInitial"
              type="text"
              placeholder="X"
              value={lastInitial}
              onChange={(e) => setLastInitial(e.target.value.slice(0, 1).toUpperCase())}
              maxLength={1}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthday" className="form-label">
              Birthday
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="form-input"
            />
          </div>

          {error && (
            <div className="alert alert-error mb-lg">
              {error}
            </div>
          )}

          <div className="section-center mt-xl">
            <button 
              type="button"
              onClick={() => setStep('avatar')}
              disabled={loading}
              className="btn-pill mb-md"
            >
              ← Back
            </button>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import AvatarBackgroundGenerator from './AvatarBackgroundGenerator';

interface AvatarRegeneratorProps {
  userId: string;
  avatarParts: any;
  currentBackgroundSeed: string;
  onUpdate: () => void;
}

export default function AvatarRegenerator({ 
  userId, 
  avatarParts, 
  currentBackgroundSeed,
  onUpdate 
}: AvatarRegeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundSeed, setBackgroundSeed] = useState(currentBackgroundSeed);
  const [backgroundCanvas, setBackgroundCanvas] = useState<HTMLCanvasElement | null>(null);
  const [showBackgroundGenerator, setShowBackgroundGenerator] = useState(false);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleBackgroundGenerated = (canvas: HTMLCanvasElement) => {
    setBackgroundCanvas(canvas);
    setShowBackgroundGenerator(false);
  };

  const shuffleBackground = () => {
    const newSeed = `${JSON.stringify(avatarParts)}-${Date.now()}-${Math.random()}`;
    setBackgroundSeed(newSeed);
    setShowBackgroundGenerator(true);
  };

  const drawAvatar = async () => {
    if (!avatarParts || !backgroundCanvas) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setLoading(true);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);

    const layers = [
      { part: avatarParts.neck, folder: 'necks' },
      { part: avatarParts.head, folder: 'heads' },
      { part: avatarParts.eyes, folder: 'eyes' },
      { part: avatarParts.mouth, folder: 'mouths' },
      { part: avatarParts.horns, folder: 'horns' }
    ];

    try {
      for (const layer of layers) {
        if (layer.part === 'none') continue;

        const img = new Image();
        const imagePath = `/avatars/${layer.folder}/${layer.part}.png`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(null);
          };
          img.onerror = (e) => {
            console.error(`Failed to load: ${imagePath}`, e);
            resolve(null);
          };
          img.src = imagePath;
        });
      }

      const dataUrl = canvas.toDataURL('image/png');
      setAvatarDataUrl(dataUrl);

    } catch (error) {
      console.error('Error drawing avatar:', error);
    }

    setLoading(false);
  };

  const uploadNewAvatar = async () => {
    if (!avatarDataUrl) return;

    setUploading(true);

    try {
      const response = await fetch(avatarDataUrl);
      const blob = await response.blob();

      const fileName = `${userId}-${Date.now()}.png`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload avatar');
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          background_seed: backgroundSeed,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Update error:', updateError);
        alert('Failed to update profile');
      } else {
        alert('Avatar background updated! 🎨');
        onUpdate();
      }

    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }

    setUploading(false);
  };

  useEffect(() => {
    if (backgroundCanvas) {
      drawAvatar();
    }
  }, [backgroundCanvas]);

  useEffect(() => {
    setShowBackgroundGenerator(true);
  }, []);

  return (
    <div className="content-box section-center">
      <h3 className="heading-md mb-md">Shuffle Background</h3>
      
      <canvas 
        ref={canvasRef} 
        width={512} 
        height={512}
        className="sr-only"
      />

      <div className="avatar-preview-container mb-md">
        {loading ? (
          <p className="text-secondary">...</p>
        ) : avatarDataUrl ? (
          <img 
            src={avatarDataUrl} 
            alt="Avatar preview" 
            className="avatar-preview-image"
          />
        ) : (
          <p className="text-secondary">Generating...</p>
        )}
      </div>

      <div className="flex-wrap mb-md">
        <button
          onClick={shuffleBackground}
          disabled={loading || uploading}
          className="btn btn-primary"
        >
          SHUFFLE
        </button>

        <button
          onClick={uploadNewAvatar}
          disabled={loading || uploading || !avatarDataUrl}
          className="btn btn-primary"
        >
          {uploading ? 'Saving...' : '✓ Save New Background'}
        </button>
      </div>

      <p className="text-secondary mb-sm">
        Your avatar parts stay the same, only the background changes!
      </p>

      {showBackgroundGenerator && (
        <AvatarBackgroundGenerator
          seed={backgroundSeed}
          onGenerated={handleBackgroundGenerated}
          size={512}
        />
      )}
    </div>
  );
}
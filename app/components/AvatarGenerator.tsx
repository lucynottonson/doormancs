"use client";

export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import AvatarBackgroundGenerator from './AvatarBackgroundGenerator';

interface AvatarParts {
  neck: string;
  head: string;
  eyes: string;
  mouth: string;
  horns: string;
}

interface AvatarGeneratorProps {
  onAvatarGenerated: (avatarBlob: Blob, avatarUrl: string, avatarParts: AvatarParts) => void;
}

export default function AvatarGenerator({ onAvatarGenerated }: AvatarGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const avatarOptions = {
    necks: Array.from({ length: 18 }, (_, i) => `neck${i + 1}`),
    heads: Array.from({ length: 36 }, (_, i) => `head${i + 1}`),
    eyes: Array.from({ length: 30 }, (_, i) => `eyes${i + 1}`),
    mouths: Array.from({ length: 10 }, (_, i) => `mouth${i + 1}`),
    horns: ['none', ...Array.from({ length: 45 }, (_, i) => `horns${i + 1}`)]
  };

  const [currentParts, setCurrentParts] = useState<AvatarParts | null>(null);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [backgroundCanvas, setBackgroundCanvas] = useState<HTMLCanvasElement | null>(null);
  const [showBackgroundGenerator, setShowBackgroundGenerator] = useState(true);

  const isAvatarTaken = async (parts: AvatarParts): Promise<boolean> => {
    const combinationString = JSON.stringify(parts);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('avatar_combination', combinationString)
      .limit(1);

    if (error) {
      console.error('Error checking avatar availability:', error);
      return false;
    }

    return data && data.length > 0;
  };

  const generateRandomAvatar = async () => {
    setCheckingAvailability(true);
    setShowBackgroundGenerator(true);
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const randomParts: AvatarParts = {
        neck: avatarOptions.necks[Math.floor(Math.random() * avatarOptions.necks.length)],
        head: avatarOptions.heads[Math.floor(Math.random() * avatarOptions.heads.length)],
        eyes: avatarOptions.eyes[Math.floor(Math.random() * avatarOptions.eyes.length)],
        mouth: avatarOptions.mouths[Math.floor(Math.random() * avatarOptions.mouths.length)],
        horns: avatarOptions.horns[Math.floor(Math.random() * avatarOptions.horns.length)]
      };

      const taken = await isAvatarTaken(randomParts);
      
      if (!taken) {
        setCurrentParts(randomParts);
        setCheckingAvailability(false);
        return;
      }

      attempts++;
    }

    setCheckingAvailability(false);
    alert('Something is wrong. Try again.');
  };

  const handleBackgroundGenerated = (canvas: HTMLCanvasElement) => {
    setBackgroundCanvas(canvas);
    setShowBackgroundGenerator(false);
  };

  const drawAvatar = async () => {
    if (!currentParts) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setLoading(true);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundCanvas) {
      ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);
    }

    const layers = [
      { part: currentParts.neck, folder: 'necks' },
      { part: currentParts.head, folder: 'heads' },
      { part: currentParts.eyes, folder: 'eyes' },
      { part: currentParts.mouth, folder: 'mouths' },
      { part: currentParts.horns, folder: 'horns' }
    ];

    try {
      for (const layer of layers) {
        if (layer.part === 'none') continue;

        const img = new Image();
        const imagePath = `/avatars/${layer.folder}/${layer.part}.png`;
        
        console.log('Loading image:', imagePath);
        
        await new Promise((resolve) => {
          img.onload = () => {
            console.log('Loaded:', imagePath);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(null);
          };
          img.onerror = (e) => {
            console.error(`FAILED TO MAKE: ${imagePath}`, e);
            resolve(null);
          };
          img.src = imagePath;
        });
      }

      const dataUrl = canvas.toDataURL('image/png');
      setAvatarDataUrl(dataUrl);

      canvas.toBlob((blob) => {
        if (blob) {
          onAvatarGenerated(blob, dataUrl, currentParts);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error drawing avatar:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentParts && backgroundCanvas) {
      drawAvatar();
    }
  }, [currentParts, backgroundCanvas]);

  useEffect(() => {
    generateRandomAvatar();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      alignItems: 'center'
    }}>
      <h3 style={{ margin: 0 }}>Actualize Your Identity</h3>
      
      <canvas 
        ref={canvasRef} 
        width={512} 
        height={512}
        style={{ display: 'none' }}
      />

      <div style={{ 
        width: '250px', 
        height: '250px', 
        border: '3px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        {loading || checkingAvailability ? (
          <p style={{ color: '#666' }}>
            {checkingAvailability ? 'Making ur little character' : '...'}
          </p>
        ) : avatarDataUrl ? (
          <img 
            src={avatarDataUrl} 
            alt="preview" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              imageRendering: 'crisp-edges'
            }}
          />
        ) : (
          <p style={{ color: '#666' }}>Generating...</p>
        )}
      </div>

      <button
        onClick={generateRandomAvatar}
        type="button"
        disabled={checkingAvailability || loading}
        style={{
          padding: '12px 40px',
          backgroundColor: checkingAvailability || loading ? '#6c757d' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: checkingAvailability || loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          opacity: checkingAvailability || loading ? 0.6 : 1
        }}
      >
        {checkingAvailability ? 'Finding unique avatar...' : 'SHUFFLE'}
      </button>

      <p style={{ 
        fontSize: '13px', 
        color: '#666', 
        textAlign: 'center',
        margin: 0,
        fontStyle: 'italic'
      }}>
        Each avatar is unique. You cannot change it after you finalize so choose carefully. It is not that serious. You will learn to accept the avatar and username you chose. There are almost 9 million possible avatar combinations. 
      </p>

      {showBackgroundGenerator && currentParts && (
        <AvatarBackgroundGenerator
          seed={JSON.stringify(currentParts)}
          onGenerated={handleBackgroundGenerated}
          size={512}
        />
      )}
    </div>
  );
}
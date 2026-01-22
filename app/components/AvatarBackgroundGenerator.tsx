"use client";


import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface AvatarBackgroundGeneratorProps {
  seed: string;
  onGenerated: (canvas: HTMLCanvasElement) => void;
  size?: number;
}
// I WILL CHANGE BACKGROUND OPTIONS LATER THIS IS JUST PLACEHOLDER AND I THINK THESE ARE UGGO
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export default function AvatarBackgroundGenerator({ 
  seed, 
  onGenerated, 
  size = 512 
}: AvatarBackgroundGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (p5Instance.current) {
      p5Instance.current.remove();
    }

    const sketch = (p: p5) => {
      const seedNumber = hashCode(seed);
      p.randomSeed(seedNumber);
      p.noiseSeed(seedNumber);

      p.setup = () => {
        p.createCanvas(size, size);
        p.noLoop();
      };

      p.draw = () => {
        const style = p.floor(p.random(5));
        
        switch(style) {
          case 0:
            drawGradientBackground(p);
            break;
          case 1:
            drawGeometricPattern(p);
            break;
          case 2:
            drawCirclePattern(p);
            break;
          case 3:
            drawWavePattern(p);
            break;
          case 4:
            drawNoiseBackground(p);
            break;
        }

        setTimeout(() => {
const canvas = (p as any).canvas as HTMLCanvasElement;          onGenerated(canvas);
        }, 100);
      };

      function drawGradientBackground(p: p5) {
        const c1 = p.color(p.random(255), p.random(255), p.random(255));
        const c2 = p.color(p.random(255), p.random(255), p.random(255));
        
        for (let y = 0; y < p.height; y++) {
          const inter = p.map(y, 0, p.height, 0, 1);
          const c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(0, y, p.width, y);
        }
      }

      function drawGeometricPattern(p: p5) {
        p.background(p.random(200, 255), p.random(200, 255), p.random(200, 255));
        
        const tileSize = p.random(30, 80);
        const cols = Math.ceil(p.width / tileSize);
        const rows = Math.ceil(p.height / tileSize);
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * tileSize;
            const y = j * tileSize;
            
            p.fill(p.random(100, 255), p.random(100, 255), p.random(100, 255), p.random(50, 150));
            p.noStroke();
            
            const shape = p.floor(p.random(3));
            if (shape === 0) {
              p.rect(x, y, tileSize, tileSize);
            } else if (shape === 1) {
              p.ellipse(x + tileSize/2, y + tileSize/2, tileSize, tileSize);
            } else {
              p.triangle(x, y + tileSize, x + tileSize/2, y, x + tileSize, y + tileSize);
            }
          }
        }
      }

      function drawCirclePattern(p: p5) {
        const bgColor = p.color(p.random(200, 255), p.random(200, 255), p.random(200, 255));
        p.background(bgColor);
        
        const numCircles = p.random(20, 50);
        
        for (let i = 0; i < numCircles; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const diameter = p.random(20, 150);
          
          p.fill(p.random(100, 255), p.random(100, 255), p.random(100, 255), p.random(30, 100));
          p.noStroke();
          p.ellipse(x, y, diameter, diameter);
        }
      }

      function drawWavePattern(p: p5) {
        p.background(p.random(200, 255), p.random(200, 255), p.random(200, 255));
        
        const numWaves = p.random(5, 15);
        
        for (let i = 0; i < numWaves; i++) {
          p.noFill();
          p.stroke(p.random(100, 255), p.random(100, 255), p.random(100, 255), p.random(50, 150));
          p.strokeWeight(p.random(2, 10));
          
          p.beginShape();
          for (let x = 0; x <= p.width; x += 10) {
            const y = p.map(
              p.sin(x * 0.01 + i * 0.5), 
              -1, 
              1, 
              p.random(p.height * 0.2), 
              p.random(p.height * 0.8)
            );
            p.vertex(x, y);
          }
          p.endShape();
        }
      }

      function drawNoiseBackground(p: p5) {
        const noiseScale = p.random(0.005, 0.02);
        
        for (let x = 0; x < p.width; x++) {
          for (let y = 0; y < p.height; y++) {
            const noiseVal = p.noise(x * noiseScale, y * noiseScale);
            const brightness = p.map(noiseVal, 0, 1, 100, 255);
            
            p.stroke(
              brightness + p.random(-30, 30), 
              brightness + p.random(-30, 30), 
              brightness + p.random(-30, 30)
            );
            p.point(x, y);
          }
        }
      }
    };

    p5Instance.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [seed, size, onGenerated]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute', 
        left: '-9999px',
        visibility: 'hidden'
      }}
    />
  );
}
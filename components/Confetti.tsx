import React, { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiPieces = useRef<ConfettiPiece[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#143328', '#E89F71', '#87C38F', '#F4E8C1', '#B8A398'];

    const createConfetti = () => {
      const pieces: ConfettiPiece[] = [];
      const count = window.innerWidth < 768 ? 20 : 30;

      for (let i = 0; i < count; i++) {
        pieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          rotation: Math.random() * 360,
          speed: Math.random() * 1 + 0.5,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.05 + 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
          shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
        });
      }

      return pieces;
    };

    confettiPieces.current = createConfetti();

    const drawConfetti = (piece: ConfettiPiece) => {
      ctx.save();
      ctx.translate(piece.x + Math.sin(piece.wobble) * 10, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;
      ctx.globalAlpha = 0.7;

      if (piece.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (piece.shape === 'square') {
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -piece.size / 2);
        ctx.lineTo(piece.size / 2, piece.size / 2);
        ctx.lineTo(-piece.size / 2, piece.size / 2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.current.forEach((piece) => {
        piece.y += piece.speed;
        piece.rotation += 2;
        piece.wobble += piece.wobbleSpeed;

        if (piece.y > canvas.height + 20) {
          piece.y = -20;
          piece.x = Math.random() * canvas.width;
        }

        drawConfetti(piece);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

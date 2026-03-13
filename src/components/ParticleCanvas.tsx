import { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  mouseX?: number;
  mouseY?: number;
}

const ParticleCanvas = ({ mouseX = 0, mouseY = 0 }: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { 
      x: number; 
      y: number; 
      size: number; 
      speedX: number; 
      speedY: number; 
      opacity: number; 
      color: string;
      baseX: number;
      baseY: number;
    }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const isThemed = Math.random() > 0.8;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * -0.5 - 0.1,
          opacity: Math.random() * 0.4 + 0.1,
          color: isThemed ? (Math.random() > 0.5 ? "355, 85%, 55%" : "245, 75%, 65%") : "255, 255%, 255%",
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mX = (mouseRef.current.x / 20 + 0.5) * canvas.width;
      const mY = (mouseRef.current.y / 20 + 0.5) * canvas.height;

      particles.forEach((p) => {
        // Move particles
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 80) * 0.3;

        // Mouse interaction (Parallax shift for particles)
        const dx = mX - p.x;
        const dy = mY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = `hsla(${p.color}, ${p.opacity * 0.5})`;
        ctx.fillStyle = `hsla(${p.color}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleCanvas;

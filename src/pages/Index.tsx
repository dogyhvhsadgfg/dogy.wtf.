import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleCanvas from "@/components/ParticleCanvas";
import StartScreen from "@/components/StartScreen";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background with Parallax */}
      <div 
        className="bg-wrap"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1)",
        }}
      >
        <img src="/images/background.png" alt="" className="bg-image" />
        <div className="bg-vignette" />
      </div>

      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

      <AnimatePresence>
        {!entered && <StartScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <div className="relative z-10 flex items-center justify-center w-full">
          <ProfileCard audioAutoPlay={true} />
        </div>
      )}
    </div>
  );
};

export default Index;

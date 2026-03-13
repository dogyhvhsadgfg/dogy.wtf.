import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

interface StartScreenProps {
  onEnter: () => void;
}

const StartScreen = ({ onEnter }: StartScreenProps) => {
  return (
    <motion.div
      className="start-overlay"
      onClick={onEnter}
      exit={{ opacity: 0, backdropFilter: "blur(0px)", scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dual floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [-40, 40, -40], y: [-30, 30, -30] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(355 85% 55% / 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [30, -30, 30], y: [20, -40, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title with scale + blur entrance */}
      <motion.div
        className="flex flex-col items-center relative z-10"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="start-title text-glow"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.1)",
              "0 0 40px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          D O G Y . W T F
        </motion.h1>

        <motion.p
          className="start-sub mt-4"
          initial={{ opacity: 0, letterSpacing: "20px" }}
          animate={{ opacity: 1, letterSpacing: "6px" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        >
          [ TOUCH THE SOUL ]
        </motion.p>
      </motion.div>

      {/* Subtle breathing ring */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-foreground/5 pointer-events-none z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.05, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="flex gap-4 mt-10 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {[
          {
            href: "https://www.youtube.com/channel/UCc-euhHzR6q5fCfh-9w5ovQ",
            cls: "yt",
            icon: <Youtube size={18} />,
          },
          {
            href: "https://www.tiktok.com/@aimmer_dogy",
            cls: "tt",
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.1v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.26 8.26 0 0 0 4.76 1.5v-3.4a4.82 4.82 0 0 1-1-.16z" />
              </svg>
            ),
          },
        ].map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-btn ${s.cls}`}
            whileHover={{ y: -5, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + i * 0.15, type: "spring", stiffness: 300 }}
          >
            {s.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;

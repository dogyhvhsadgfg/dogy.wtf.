import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Gamepad2, Music, Youtube, Copy, Check } from "lucide-react";
import avatarImg from "@/assets/avatar.png";
import AudioPlayer from "./AudioPlayer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const useTypewriter = (text: string, speed: number, start: boolean) => {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setDisplay("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return { display, done };
};

interface ProfileCardProps {
  audioAutoPlay: boolean;
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const ProfileCard = ({ audioAutoPlay }: ProfileCardProps) => {
  const [showBio, setShowBio] = useState(false);
  const [copied, setCopied] = useState(false);

  const name = useTypewriter("dogy.wtf", 150, true);
  const bio = useTypewriter(
    "The Fool that doesn't belong to this era,\nThe Mysterious Ruler Above the Gray Fog,\nThe King of Yellow and Black who wields good luck.",
    35,
    showBio
  );

  const copyDiscord = () => {
    navigator.clipboard.writeText("dogdog10");
    setCopied(true);
    toast.success("Discord username copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (name.done) {
      const t = setTimeout(() => setShowBio(true), 400);
      return () => clearTimeout(t);
    }
  }, [name.done]);

  return (
    <motion.div
      className="w-[95%] max-w-[880px] relative"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 2000, transformStyle: "preserve-3d" }}
    >
      {/* Animated orb glow */}
      <motion.div
        className="orb-glow absolute -top-20 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass-card p-8 md:p-10">
        <motion.div
          className="relative z-10 flex flex-col md:flex-row gap-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <motion.div
            className="flex flex-col items-center md:border-r md:border-border md:pr-8 gap-5 md:min-w-[240px]"
            variants={fadeUp}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="avatar-ring">
                <img src={avatarImg} alt="Avatar" className="w-28 h-28 object-cover" />
              </div>
              <motion.div
                className="presence-dot"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div className="text-center w-full mt-2" variants={fadeUp}>
              <h1 className={`glitch-text text-glow-primary ${!name.done ? "typewriter-cursor" : ""}`}>
                {name.display}
              </h1>
              <motion.p
                className="text-sm text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                dogdog10 • Sunny/sunless
              </motion.p>

              <motion.div
                className="status-pill mt-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Moon size={14} />
                <span>im broke</span>
              </motion.div>
            </motion.div>

            <motion.div className="flex gap-3 mt-2" variants={fadeIn}>
              <TooltipProvider>
                {[
                  {
                    href: "https://www.youtube.com/channel/UCc-euhHzR6q5fCfh-9w5ovQ",
                    cls: "yt",
                    icon: <Youtube size={18} />,
                    label: "YouTube",
                  },
                  {
                    href: "https://www.tiktok.com/@aimmer_dogy",
                    cls: "tt",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.1v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.26 8.26 0 0 0 4.76 1.5v-3.4a4.82 4.82 0 0 1-1-.16z" />
                      </svg>
                    ),
                    label: "TikTok",
                  },
                ].map((s, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-btn ${s.cls}`}
                        whileHover={{ y: -5, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        {s.icon}
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{s.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="flex-1 flex flex-col gap-6" variants={fadeUp}>
            <motion.div variants={fadeUp}>
              <motion.h3
                className="text-xs tracking-widest text-muted-foreground/60 font-semibold mb-3 text-glow"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                ABOUT ME
              </motion.h3>
              <p
                className={`text-[1.02rem] leading-relaxed font-light whitespace-pre-wrap min-h-[80px] text-glow ${!bio.done ? "typewriter-cursor" : ""}`}
              >
                {bio.display}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-[#5865F2]">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                  ),
                  label: "ONLINE",
                  actIcon: <Gamepad2 size={28} className="text-foreground/80" />,
                  name: "Rust",
                  stat: "01:23:45 elapsed",
                  delay: 0,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="#1DB954" width="14" height="14">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  ),
                  label: "SPOTIFY",
                  actIcon: <Music size={28} className="text-foreground/80" />,
                  name: "woopaa",
                  stat: "on Assets",
                  delay: 2,
                },
              ].map((w, i) => (
                <motion.div
                  key={i}
                  className="widget-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.2,
                  }}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className="text-[0.65rem] tracking-wider font-extrabold text-foreground/80 mb-3 flex items-center gap-2 text-glow">
                    {w.icon}
                    {w.label}
                  </div>
                  <div className="flex items-center gap-4">
                    {w.actIcon}
                    <div>
                      <p className="text-sm font-semibold">{w.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{w.stat}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Discord Copy Widget */}
              <motion.div
                className="widget-card cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{ animationDelay: "1.2s" }}
                onClick={copyDiscord}
              >
                <div className="text-[0.65rem] tracking-wider font-extrabold text-foreground/80 mb-3 flex items-center gap-2 text-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-[#5865F2]">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  DISCORD
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#5865F2]/20 text-[#5865F2]">
                      <Copy size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">dogdog10</p>
                      <p className="text-[0.6rem] text-muted-foreground uppercase tracking-tighter">Click to copy</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: copied ? 1 : 0, opacity: copied ? 1 : 0 }}
                    className="text-green-500"
                  >
                    <Check size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer player */}
        <motion.div
          className="relative z-10 mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AudioPlayer autoPlay={audioAutoPlay} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;

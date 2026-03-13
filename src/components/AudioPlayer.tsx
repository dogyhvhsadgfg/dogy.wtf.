import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Volume1 } from "lucide-react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

const AudioPlayer = ({ autoPlay = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
      setMuted(v === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !audioRef.current.duration) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="player-bar">
      <audio ref={audioRef} loop onTimeUpdate={handleTimeUpdate} src="/audio.mp3" />
      <button onClick={togglePlay} className="player-btn">
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="player-btn">
          <VolumeIcon size={16} />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className="vol-slider"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;

import React, { useEffect, useRef, useState } from "react";
import totoro from "../assets/totoro.gif";
import totoro3 from "../assets/totoro3.gif";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type PropsType = {
  youtubeId: string;
  handlePlay: () => void;
  handleStop: () => void;
};

const YouTubePlayer: React.FC<PropsType> = ({
  youtubeId,
  handlePlay,
  handleStop,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Load YouTube API & initialize player
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) return;

      const ytPlayer = new window.YT.Player(playerRef.current, {
        height: "230",
        width: "230",
        videoId: youtubeId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          autoplay: 1, // autoplay enabled
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
            event.target.playVideo(); // play immediately
          },
        },
      });
    };
  }, []); // run only once

  //handle play
  const isPlaying = (): void => {
    player.playVideo();
    handlePlay();
  };

  //handle pause
  const isPause = (): void => {
    player.pauseVideo();
    handleStop();
  };

  //handle stop
  const isStop = (): void => {
    player.stopVideo();
    handleStop();
  };

  // Update player when youtubeId changes
  useEffect(() => {
    if (player) {
      player.loadVideoById({ videoId: youtubeId, suggestedQuality: "default" });
      player.playVideo();
    }
  }, [youtubeId, player]);

  // Update currentTime periodically
  useEffect(() => {
    if (!player) return;
    const interval = setInterval(() => {
      if (!isSeeking) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player, isSeeking]);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>
  ) => {
    setIsSeeking(false);
    const val = (e.target as HTMLInputElement).value;
    if (player) {
      player.seekTo(parseFloat(val), true);
    }
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative flex flex-col items-center space-y-6 p-6 max-w-[360px] w-full rounded-3xl shadow-lg border-2 border-[#6b4b2d] font-mono bg-gradient-to-br from-[#d3b7a5] via-[#b38e76] to-[#ac754c]">
      {/* Player display */}
      <img
        src={totoro}
        alt="totoro"
        className="absolute top-[-40px] h-10 hover:h-12 hover:top-[-48px] z-20 transition-all duration-300"
      />
      <img
        src={totoro3}
        alt="totoro3"
        className="absolute top-[-30px] left-5 h-8 hover:h-10 hover:top-[-38px] z-20 transition-all duration-300"
      />
      <div className="relative w-full h-40 rounded-xl shadow-inner border border-[#8a5f30] bg-oldschool-radial flex justify-center items-center text-[#3c2e21] text-[1.3rem] font-bold font-mono">
        {/* YouTube player container */}
        <div
          ref={playerRef}
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
        >
          MUSIC PLAYER
        </div>

        {/* Overlay to block clicks */}
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "transparent", pointerEvents: "auto" }}
        ></div>
      </div>

      {/* Seek slider */}
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        onChange={handleSeekChange}
        onMouseDown={handleSeekMouseDown}
        onMouseUp={handleSeekMouseUp}
        onTouchStart={handleSeekMouseDown}
        onTouchEnd={handleSeekMouseUp}
        className="w-full cursor-pointer h-2 rounded-lg appearance-none outline-none bg-slider-gradient shadow-inner"
      />

      {/* Time display */}
      <div className="w-full flex justify-between text-xs tracking-wide text-[#5a3e1b] font-semibold">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Play / Pause / Stop buttons */}
      <div className="flex space-x-6">
        {["Play", "Pause", "Stop"].map((action) => {
          const colors = {
            Play: "bg-yellow-400 hover:bg-yellow-500 text-[#3c2f1b] border-[#7a5e26] shadow-inner-play shadow-xl",
            Pause:
              "bg-[#8f6238] hover:bg-[#7e552d] text-[#e0c68b] border-[#5f421b] shadow-inner-pause shadow-xl",
            Stop: "bg-[#6b4b2d] hover:bg-[#5a3f23] text-[#cdb789] border-[#4d3a1a] shadow-inner-stop shadow-xl",
          };
          return (
            <button
              key={action}
              onClick={() => {
                if (!player) return;
                if (action === "Play") isPlaying();
                else if (action === "Pause") isPause();
                else if (action === "Stop") isStop();
              }}
              className={`px-5 py-2 rounded-full font-bold transition-colors duration-300 border-2 ${colors[action]} font-mono select-none text-shadow-oldschool`}
            >
              {action}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubePlayer;

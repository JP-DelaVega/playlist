import { useState, useEffect } from "react";
import vinyl from "./assets/vinly.png";
import cat from "./assets/cat.gif";
import flower2 from "./assets/flower2.gif";
import flower3 from "./assets/flower3.gif";
import totoro2 from "./assets/totoro2.gif";
import beeflying from "./assets/beeflying.gif";
import YouTubePlayer from "./components/Music";
import ClickSpark from "./components/ClickSpark";
import LightRays from "./components/LightRays";
import Sidebar from "./components/Sidebar";
import Fireflies from "./components/Fireflies";
import type { YouTubePlaylistItem } from "./types/youtube";
import { getPlaylistVideos } from "./services/youtubePlaylist";

function App() {
  const [selectedId, setSelectedId] = useState<string>("ZGFg-842-Ug");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<YouTubePlaylistItem[]>([]);

  const getData = async () => {
    const data = await getPlaylistVideos();
    setPlaylist(data.items);
  };

  useEffect(() => {
    getData();
  }, []);

  const getRandomVideo = (): void => {
    if (playlist.length === 0) return;

    let randomIndex: number;
    let randomVideo: YouTubePlaylistItem;

    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
      randomVideo = playlist[randomIndex];
    } while (
      playlist.length > 1 &&
      randomVideo.contentDetails.videoId === selectedId
    );

    setSelectedId(randomVideo.contentDetails.videoId);
    console.log("asdd11asdasd");
  };

  const handleSelect = (id: string): void => {
    setSelectedId(id);
  };

  const handlePlay = (): void => {
    setIsPlaying(true);
  };
  const handleStop = (): void => {
    setIsPlaying(false);
  };
  return (
    <ClickSpark
      sparkColor="#FFF"
      sparkSize={15}
      sparkRadius={30}
      sparkCount={8}
      duration={500}
    >
      <div className="relative h-screen w-screen">
        <Fireflies trigger={isPlaying} count={12} />

        <img
          src={flower2}
          alt="flower2"
          className="absolute top-20 lg:bottom-0 right-5  h-30 z-20"
        />
        <img
          src={flower3}
          alt="flower3"
          className="absolute bottom-0 h-24 lg:h-32 scale-x-[-1] z-20"
        />
        <img
          src={flower3}
          alt="flower3"
          className="absolute bottom-0 left-16 h-20 lg:h-40 z-20"
        />
        <img
          src={beeflying}
          alt="beeflying"
          className="absolute bottom-30 left-1 h-20 lg:h-40 hover:h-22 lg:hover:h-50 z-20 transition-all duration-300"
        />

        <LightRays
          raysOrigin="top-center"
          raysColor="white"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={5.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.2}
          distortion={0.05}
          className="custom-rays"
        />
        <div className="flex  items-center justify-center w-screen h-screen absolute top-0 z-10">
          <Sidebar handleSelect={handleSelect} selectedId={selectedId} />

          <div className="flex flex-col lg:flex-row  justify-center items-center gap-10">
            <div className="relative z-0">
              <img
                src={vinyl}
                alt="Vinyl"
                className={`transition-all duration-1000 transform origin-center w-full h-full z-0 ${
                  isPlaying && "spin-slow"
                }`}
              />
              {isPlaying && (
                <>
                  <img
                    src={cat}
                    alt="Cat"
                    className="absolute top-3/5  left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 hover:h-30 transition-all duration-300"
                  />
                  <img
                    src={totoro2}
                    alt="totoro2"
                    className="absolute top-[-48px] left-5/11 scale-x-[-1] h-12 hover:h-14 hover:top-[-56px] z-20 transition-all duration-300"
                  />
                </>
              )}
            </div>
            <YouTubePlayer
              youtubeId={selectedId}
              handlePlay={handlePlay}
              handleStop={handleStop}
              getRandomVideo={getRandomVideo}
            ></YouTubePlayer>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}

export default App;

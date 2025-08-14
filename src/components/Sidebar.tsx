import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getPlaylistVideos } from "../services/youtubePlaylist";
import Card from "./Card";
type YouTubePlaylistItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
};

type SidebarProps = {
  handleSelect: (id: string) => void;
  selectedId: string;
};
export default function Sidebar({ handleSelect, selectedId }: SidebarProps) {
  const [playlist, setPlaylist] = useState<YouTubePlaylistItem[]>([]);
  const [open, setOpen] = useState(false);

  const getData = async () => {
    const data = await getPlaylistVideos();
    setPlaylist(data.items);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      {/* Hamburger Button */}
      <button
        className="p-2 z-50 fixed top-2 right-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`z-30 fixed top-0 right-0 h-full bg-white border-l border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "340px" }}
      >
        <div className="p-4 font-mono text-gray-900 font-bold text-lg border-b border-gray-300">
          Playlist
        </div>
        <ul className="flex flex-col space-y-2 p-4 text-gray-700 font-mono ">
          {playlist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.snippet.resourceId.videoId)}
            >
              <Card
                title={item.snippet.title}
                thumbnail={item.snippet.thumbnails.default.url}
                selectedId={selectedId}
                id={item.snippet.resourceId.videoId}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

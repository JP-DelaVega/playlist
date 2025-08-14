type MusicCardProps = {
  title: string;
  thumbnail: string;
  selectedId: string;
  id: string;
};

export default function Card({
  title,
  thumbnail,
  selectedId,
  id,
}: MusicCardProps) {
  return (
    <div
      className={` shadow-sm hover:shadow-xl hover:bg-red-200  rounded-xl overflow-hidden flex items-center gap-4 p-4 transition ${
        selectedId === id ? "bg-red-200" : "bg-white"
      }`}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-16 h-16 object-cover rounded-md"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-md font-semibold truncate">{title}</h3>
      </div>
    </div>
  );
}


export const getPlaylistVideos = async () => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${
      import.meta.env.VITE_PLAYLIST_ID
    }&maxResults=50&key=${import.meta.env.VITE_API_KEY}`
  );
  const data = await res.json();
  return data;
};


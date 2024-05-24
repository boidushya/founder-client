import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    filter: "blur(3px)",
    x: -12,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
  },
};

const Song = ({
  title,
  thumbnail,
  link,
  artist,
}: {
  title: string;
  thumbnail: string;
  link: string;
  artist: string;
}) => {
  return (
    <motion.li variants={itemVariants}>
      <a href={link} target="_blank" rel="noreferrer">
        <div className="thumb-container">
          <img src={thumbnail} alt="These Walls" className="max-w-[none]" />
        </div>
        <div className="song-info">
          <h4>{title}</h4>
          <p> by {artist}</p>
        </div>
      </a>
    </motion.li>
  );
};

const clean = (s: string) => {
  return s.replace(/ - Topic/g, "").replace(/VEVO/g, "");
};

const MusicSection = () => {
  const fetcher = async () => {
    const url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=PLAVz83Xtm7v2SeBdjrAFBNCwYIft8ZdVl&key=AIzaSyD_-SE7VcOCfum3vfbqGn3iypOtmnaJJj0";
    const response = await fetch(url);
    const data = await response.json();
    const videos = data.items.map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      artist: clean(item.snippet.videoOwnerChannelTitle),
      thumbnail: item.snippet.thumbnails.high.url,
    }));
    console.log(videos);
    return videos;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["music"],
    queryFn: fetcher,
  });
  return (
    <>
      <h3>As you might've figured, I love music!</h3>
      <a
        className="ytm-title"
        href="https://music.youtube.com/playlist?list=PLAVz83Xtm7v2SeBdjrAFBNCwYIft8ZdVl&si=cUgD3kahp6Gcheeo"
      >
        <img
          src="https://music.youtube.com/img/favicon_32.png"
          alt="Youtube Music Playlist"
        />
        <p>What I listen to when I'm in the zone</p>
      </a>
      <motion.ol
        variants={containerVariants}
        initial="initial"
        animate="animate"
        id="songs"
        className="mt-4"
      >
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {data &&
          data?.map((item: any) => (
            <Song
              key={item.title}
              title={item.title}
              thumbnail={item.thumbnail}
              link={item.link}
              artist={item.artist}
            />
          ))}
      </motion.ol>
    </>
  );
};

export default MusicSection;

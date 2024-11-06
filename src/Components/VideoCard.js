import React, { useRef, useState } from "react";
import marked from 'marked';
// import Markdown from 'react-markdown'
import "./VideoCard.css";
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";

function VideoCard({ url, likes, shares, channel, avatarSrc,title,body }) {
  // const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const baseUrl = 'https://hive.blog';
  const htmlContent = marked(body.slice(0, 600));

  // const headingRef = useRef(null);
  //useState
  //useRef
  return (
    <div className="videoCard">
      <VideoHeader />
      <div className="videoCard__player">
      <h3 className="sher">
        {title}
      </h3>
      {/* <h4 >
        {body}
        
      </h4> */}
      <div className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ color: 'white' }}
    ></div>
      <a href={baseUrl+url} target="_blank" rel="noopener noreferrer">
  View Original Post
</a>

      </div>
      

{/* use the code below when footer is missing */}
{/* {url ? (
    <video
      ref={videoRef}
      className="videoCard__player"
      src={url}
      alt="IG reel video"
      loop
    />
  ) : (
    <div >No video available</div>
  )} */}
      {/* <VideoHeader /> */}
      <VideoFooter
        channel={channel}
        likes={likes}
        shares={shares}
        avatarSrc={avatarSrc}
        // song={song}
      />
    </div>
  );
}

export default VideoCard;

"use client";
import React, { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";

const VideoPlayer = ({ nextLesson }: { nextLesson: string }) => {
  const [isEndedVideo, setIsEndedVideo] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isEndedVideo) return;
    router.push(nextLesson);
  }, [isEndedVideo]);

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <MuxPlayer
          playbackId="BAHzG5m6Zk9b3GJUrPR3BQgnAZRlxYg02tMGxBS25DOk"
          metadata={{
            video_title: "Bai 39",
            viewer_user_id: "Placeholder (optional)",
          }}
          onEnded={() => setIsEndedVideo(true)}
          onPlay={() => setIsEndedVideo(false)}
        />
      </div>
    </>
  );
};

export default VideoPlayer;

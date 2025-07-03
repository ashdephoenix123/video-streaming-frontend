import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { constants } from "@/constants";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch(`${constants.apiURL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setVideoUrl(constants.apiURL + data.url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleUpload} />
      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <VideoPlayer src={videoUrl} />
        </div>
      )}
    </div>
  );
}

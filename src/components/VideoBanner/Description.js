import React from "react";

const Description = ({ title, channelName, uploadDate }) => {
  return (
    <div className="lg:pr-12">
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-xs text-neutral-400">{channelName}</p>
      <span className="text-xs text-neutral-400">{uploadDate}</span>
    </div>
  );
};

export default Description;

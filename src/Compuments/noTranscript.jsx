import React from "react";

const noTranscript = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>No Transcripts Found</h1>
      <p>No transcripts exist with the current filters applied. </p>
    </div>
  );
};

export default noTranscript;

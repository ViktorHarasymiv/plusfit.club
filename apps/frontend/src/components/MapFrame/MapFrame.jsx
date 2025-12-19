import React from "react";

function MapFrame({ url }) {
  console.log(url);

  return (
    <>
      <iframe
        src={url}
        style={{ border: "0px", marginBottom: "-10px" }}
        width="100%"
        height="550"
        loading="lazy"
      ></iframe>
    </>
  );
}

export default MapFrame;

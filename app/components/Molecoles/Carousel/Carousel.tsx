import React from "react";

function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      {images.map((image) => {
        return <img src={image} alt="Image" />;
      })}
    </div>
  );
}

export default Carousel;

import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ThumbnailSlider = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <ImageGallery
        items={images}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={false}
        slideInterval={2000}
        startIndex={selectedImageIndex}
        onSlide={handleThumbnailClick}
      />
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        {carouselThumbnails}
      </div> */}
    </div>
  );
};

export default ThumbnailSlider;

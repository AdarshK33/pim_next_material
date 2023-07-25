// import React, { useState } from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import ReactImageMagnify from "react-image-magnify";

// const CombinedImageDisplay = ({ images }) => {
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//     const [magnifiedImageLeft, setMagnifiedImageLeft] = useState(0);

//     const handleSlide = (currentIndex) => {
//         setSelectedImageIndex(currentIndex);
//     };

//     const handleThumbnailMouseEnter = (index, event) => {
//         const thumbnailRect = event.target.getBoundingClientRect();
//         const imageGalleryRect = event.currentTarget.getBoundingClientRect();
//         const left =
//             thumbnailRect.left - imageGalleryRect.left - imageGalleryRect.width;

//         setMagnifiedImageLeft(left);
//         setSelectedImageIndex(index);
//     };

//     return (
//         <div style={{ display: "flex", position: "relative" }}>
//             {/* ReactImageMagnify */}
//             <div
//                 style={{
//                     position: "absolute",
//                     left: magnifiedImageLeft,
//                     zIndex: "100",
//                     transition: "left 0.2s ease-in-out",
//                 }}
//             >
//                 <ReactImageMagnify
//                     {...{
//                         smallImage: {
//                             // alt: images[selectedImageIndex].alt,
//                             isFluidWidth: true,
//                             src: images[selectedImageIndex].original,
//                         },
//                         largeImage: {
//                             src: images[selectedImageIndex].original,
//                             width: 700,
//                             height: 680,
//                         },
//                         enlargedImageContainerStyle: {
//                             zIndex: "1500",
//                             left: "-150%",

//                         },
//                         enlargedImageContainerDimensions: {
//                             width: "100%",
//                             height: "100%",
//                         },
//                     }}
//                 />
//             </div>

//             {/* ImageGallery */}
//             <ImageGallery
//                 items={images}
//                 showNav={false}
//                 showPlayButton={false}
//                 showFullscreenButton={false}
//                 autoPlay={false}
//                 slideInterval={2000}
//                 onSlide={handleSlide}
//                 onMouseOverThumbnail={handleThumbnailMouseEnter}
//             />
//         </div>
//     );
// };

// export default CombinedImageDisplay;

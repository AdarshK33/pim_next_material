import React, { useState, useRef, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageMagnify from "react-image-magnify";

const CombinedImageDisplay = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [magnifiedImageLeft, setMagnifiedImageLeft] = useState(0);
    const magnifiedImageRef = useRef(null);

    const handleSlide = (currentIndex) => {
        setSelectedImageIndex(currentIndex);
    };

    const updateMagnifiedImagePosition = () => {
        if (magnifiedImageRef?.current && images?.length > 0) {
            console.log(magnifiedImageRef?.current, "(magnifiedImageRef.current")
            const thumbnailRect = magnifiedImageRef?.current?.getBoundingClientRect();
            const imageGalleryRect = magnifiedImageRef?.current?.parentNode.getBoundingClientRect();
            const left =
                thumbnailRect?.left - imageGalleryRect?.left - imageGalleryRect?.width;
            setMagnifiedImageLeft(left);
        }
    };

    useEffect(() => {
        updateMagnifiedImagePosition();
    }, [selectedImageIndex]);

    return (
        <div style={{ position: "relative" }}>
            <ImageGallery
                items={images}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={false}
                slideInterval={3000}
                startIndex={selectedImageIndex}
                onSlide={handleSlide}
                renderItem={(item) => (
                    <div
                        key={item.original}
                        style={{ position: "relative" }}
                        ref={selectedImageIndex === item.id ? magnifiedImageRef : null}
                    >
                        <img
                            src={item.original}
                            alt={item.alt}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                )}
            />
            {selectedImageIndex !== null && (
                <div
                    style={{
                        position: "absolute",
                        left: magnifiedImageLeft,
                        top: 0,
                        zIndex: "1500",
                        transition: "left 0.2s ease-in-out",
                    }}
                >
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                // alt: images[selectedImageIndex].alt,
                                isFluidWidth: true,
                                src: images[selectedImageIndex].original,
                            },
                            largeImage: {
                                src: images[selectedImageIndex].original,
                                width: 1000,
                                height: 480,
                            },
                            enlargedImageContainerStyle: {
                                zIndex: "1500",
                                left: "-170%",
                            },
                            enlargedImageContainerDimensions: {
                                width: "150%",
                                height: "100%",
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CombinedImageDisplay;

import { Stack, styled } from "@mui/material";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ImgGalleryProps {
  images: Array<{ original: string; thumbnail: string }>;
}

const GalleryWrapper = styled(Stack)(() => ({
  maxWidth: "1040px",
  margin: "0 auto",
}));

const ImgGallery: React.FC<ImgGalleryProps> = ({ images }) => {
  return (
    <GalleryWrapper>
      <ImageGallery
        items={images}
        autoPlay={false}
        infinite={false}
        showPlayButton={false}
        useBrowserFullscreen={false}
        slideDuration={250}
      />
    </GalleryWrapper>
  );
};

export default ImgGallery;

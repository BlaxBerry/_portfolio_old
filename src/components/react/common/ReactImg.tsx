import { useState } from "react";

const defaultSrc = "/portfolio/assets/background.webp";

function ReactImg(props: { src: string; alt: string; className?: string }) {
  const [imageSrc, setImageSrc] = useState<string>(defaultSrc);

  const handleImageLoad = () => setImageSrc(props.src || defaultSrc);
  const handleImageError = () => setImageSrc(defaultSrc);

  return (
    <img
      src={imageSrc}
      alt={props.alt}
      draggable={false}
      loading="lazy"
      onLoad={handleImageLoad}
      onError={handleImageError}
      className={props.className}
    />
  );
}

export default ReactImg;

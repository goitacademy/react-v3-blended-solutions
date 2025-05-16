import GridItem from "../GridItem/GridItem";

import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onSelect: (photo: Photo | null) => void;
}

export default function PhotosGalleryItem({
  photo,
  onSelect,
}: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
      >
        <img
          src={photo.src.large}
          alt={photo.alt}
          onClick={() => onSelect(photo)}
        />
      </div>
    </GridItem>
  );
}

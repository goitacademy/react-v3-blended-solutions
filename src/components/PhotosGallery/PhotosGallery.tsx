import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

import type { Photo } from "../../types/photo";

interface PhotosGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo | null) => void;
}

export default function PhotosGallery({
  photos,
  onSelect,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotosGalleryItem key={photo.id} photo={photo} onSelect={onSelect} />
      ))}
    </Grid>
  );
}

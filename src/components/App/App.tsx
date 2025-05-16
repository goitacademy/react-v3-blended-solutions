import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Section from "../Section/Section";
import Container from "../Container/Container";
import Loader from "../Loader/Loader";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Text from "../Text/Text";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";

import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedMoviePhoto] = useState<Photo | null>(null);

  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedMoviePhoto(photo);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);
      const fetchedPhotos = await getPhotos(query);

      if (fetchedPhotos.length === 0) {
        toast.error("No photos found for your request.");
        return;
      }

      setPhotos(fetchedPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />

          {isLoading && <Loader />}

          {isError && <Text textAlign="center">❌ Something went wrong</Text>}

          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelectPhoto} />
          )}

          {photos.length === 0 && (
            <Text textAlign="center">Sorry. There are no images ... 😭</Text>
          )}

          {selectedPhoto && (
            <Modal onClose={() => handleSelectPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}

          <Toaster position="top-center" />
        </Container>
      </Section>
    </>
  );
}

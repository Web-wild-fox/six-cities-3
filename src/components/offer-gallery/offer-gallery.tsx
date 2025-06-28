import {MAX_GALLERY_IMAGES} from '@/constants';

interface OfferGalleryProps {
  images: string[];
}

export default function OfferGallery({images}: OfferGalleryProps): JSX.Element {
  const galleryImages = images.slice(0, MAX_GALLERY_IMAGES);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          galleryImages.map((image) => (
            <div
              className="offer__image-wrapper"
              key={image}
            >
              <img
                className="offer__image"
                src={image}
                alt="Photo studio"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

import type { Image } from "@/lib/interfaces";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  images: Image[];
  onDelete: (id: number) => void;
}

const ImageGrid = ({ images, onDelete: handleDelete }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index}>
          <ImageCard image={image} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;

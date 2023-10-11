import type { Image } from "@/lib/interfaces";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

type ImageCardProps = {
  image: Image;
  onDelete: (id: number) => void;
};

const ImageCard = ({ image, onDelete }: ImageCardProps) => {
  return (
    <div className="relative">
      <img src={image.url} alt={image.name} className="w-full h-auto" />
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(image.id)}
        className="absolute bottom-4 right-4"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImageCard;

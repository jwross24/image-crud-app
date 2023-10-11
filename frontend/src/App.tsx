import { useState, useEffect, useCallback } from "react";
import SearchBox from "./components/SearchBox";
import UploadButton from "./components/UploadButton";
import ImageGrid from "./components/ImageGrid";
import type { Image } from "./lib/interfaces";

const PORT = import.meta.env.VITE_SERVER_PORT || 4000;

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImages, setCurrentImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch images when the component mounts
    setIsLoading(true);
    fetch(`http://localhost:${PORT}/images`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setCurrentImages(data);
        setIsLoading(false);
      });
  }, []);

  const handleUpload = (file: File) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    fetch(`http://localhost:${PORT}/upload`, {
      method: "POST",
      body: formData,
    }).then(() => {
      setIsLoading(false);
      fetch(`http://localhost:${PORT}/images`)
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
        });
    });
  };

  const handleSearch = useCallback(() => {
    if (searchTerm === "") {
      setCurrentImages(images);
    } else {
      const filteredImages = images.filter((img) =>
        img.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setCurrentImages(filteredImages);
    }
  }, [images, searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, images, searchTerm]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:${PORT}/image/${id}`, {
      method: "DELETE",
    }).then(() => {
      setImages(images.filter((img) => img.id !== id));
      setCurrentImages(currentImages.filter((img) => img.id !== id));
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <SearchBox
          onSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <UploadButton onUpload={handleUpload} />
      </div>
      <h1 className="text-2xl mb-4">
        {currentImages.length} {currentImages.length === 1 ? "Image" : "Images"}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ImageGrid images={currentImages} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;

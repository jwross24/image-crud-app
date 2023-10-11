import { Input } from "./ui/input";

interface SearchBoxProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBox = ({ onSearch, searchTerm, setSearchTerm }: SearchBoxProps) => {
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;

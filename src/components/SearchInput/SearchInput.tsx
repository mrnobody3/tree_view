import { ChangeEvent, FC } from 'react';

interface ISearchInput {
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<ISearchInput> = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;

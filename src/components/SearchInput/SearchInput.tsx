import { ChangeEvent, FC } from 'react';

interface ISearchInput {
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<ISearchInput> = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label htmlFor="search_id" className="block mb-2 text-lg font-bold text-gray-900">
        Searching field
      </label>
      <input
        value={searchTerm}
        onChange={handleSearch}
        type="text"
        id="search_id"
        className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
        placeholder="Folder..."
      />
    </div>
  );
};

export default SearchInput;

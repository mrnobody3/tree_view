import { ChangeEvent, useEffect, useState } from 'react';

import { data } from '../../data/treeData.ts';
import { deleteItemById, filterData, toggleExpended } from '../../helpers/';
import { useDebounce } from '../../hooks';
import { BranchType } from '../../types/apiTypes.ts';
import SearchInput from '../SearchInput/SearchInput.tsx';

const TreeView = () => {
  const [treeDate, setTreeDate] = useState<BranchType[]>(data);
  const [filteredData, setFilteredData] = useState<BranchType[]>([]);
  const [debouncedSearchTerm, searchTerm, setSearchTerm] = useDebounce('', 500);

  useEffect(() => {
    const filtered = filterData(treeDate, debouncedSearchTerm);
    setFilteredData(filtered);
  }, [debouncedSearchTerm, treeDate]);

  const onChangeExtend = (id: number) => {
    setFilteredData((prevState) => {
      return prevState.map((item) => toggleExpended(item, id));
    });
  };

  const onDeleteById = (id: number) => {
    const result = deleteItemById(id, filteredData);
    setTreeDate(result);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const renderTree = (nodes: BranchType[]) => {
    return nodes.map((node) => (
      <div key={node.id} className="flex">
        {node.type === 'folder' && (
          <div className="hover:bg-sky-300 text-gray-700">
            {node.name}
            {node.children?.length ? (
              <button onClick={() => onChangeExtend(node.id)}>
                {node.expended ? '[-]' : '[+]'}
              </button>
            ) : null}
            {node.permissions.includes('delete') && (
              <button className="ml-2" onClick={() => onDeleteById(node.id)}>
                X
              </button>
            )}
          </div>
        )}

        {node.expended && node.children && node.type === 'folder' ? (
          <div style={{ marginLeft: '20px' }}>{renderTree(node.children)}</div>
        ) : null}

        {node.type === 'file' && (
          <span className="hover:bg-sky-300">
            {node.name}
            {node.permissions.includes('delete') && (
              <button className="ml-2" onClick={() => onDeleteById(node.id)}>
                X
              </button>
            )}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div>
      <SearchInput handleSearch={handleChange} searchTerm={searchTerm} />
      <div className="mt-4">{renderTree(filteredData)}</div>
    </div>
  );
};

export default TreeView;

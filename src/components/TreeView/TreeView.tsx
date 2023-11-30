import { data } from '../../data/treeData.ts';
import deleteItemById from '../../helpers/deleteData.ts';
import filterData from '../../helpers/filterData.ts';
import toggleExpended from '../../helpers/toggleExpended.ts';
import SearchInput from '../SearchInput/SearchInput.tsx';
import { useState, useEffect, ChangeEvent } from 'react';
import { BranchType } from '../../types/apiTypes.ts';

const TreeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [treeDate, setTreeDate] = useState<BranchType[]>(data);
  const [filteredData, setFilteredData] = useState<BranchType[]>([]);

  useEffect(() => {
    const filtered = filterData(treeDate, searchTerm);
    setFilteredData(filtered);
  }, [searchTerm, treeDate]);

  function onChangeExtend(id: number) {
    setFilteredData((prevState) => {
      return prevState.map((item) => toggleExpended(item, id));
    });
  }

  const onDeleteById = (id: number) => {
    const result = deleteItemById(id, filteredData);
    setTreeDate(result);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
          </div>
        )}

        {node.expended && node.children && node.type === 'folder' ? (
          <div style={{ marginLeft: '20px' }}>{renderTree(node.children)}</div>
        ) : null}

        {node.type === 'file' && <span className="hover:bg-sky-300">{node.name}</span>}

        {node.permissions.includes('delete') && (
          <button className="ml-2" onClick={() => onDeleteById(node.id)}>
            X
          </button>
        )}
      </div>
    ));
  };

  return (
    <div>
      <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
      <div className="mt-4">{renderTree(filteredData)}</div>
    </div>
  );
};

export default TreeView;

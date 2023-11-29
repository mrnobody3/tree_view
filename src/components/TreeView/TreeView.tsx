import React, { useState, useEffect } from 'react';
import { BranchType } from '@/types/apiTypes.ts';

interface ITreeView {
  data: BranchType[];
  onExtend: (id: number) => void;
}
const TreeView: React.FC<ITreeView> = ({ data, onExtend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<BranchType[]>(data);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const renderTree = (nodes: BranchType[]) => {
    return nodes.map((node) => (
      <div key={node.id}>
        {node.type === 'folder' && (
          <div>
            {node.name}
            {node.children?.length && (
              <button onClick={() => onExtend(node.id)}>
                {node.expended ? '[-]' : '[+]'}
              </button>
            )}
          </div>
        )}

        {node.expended && node.children ? (
          <div style={{ marginLeft: '20px' }}>{renderTree(node.children)}</div>
        ) : null}
        {node.type === 'file' && <span>{node.name}</span>}
      </div>
    ));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {renderTree(filteredData)}
    </div>
  );
};

export default TreeView;

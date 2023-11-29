import filterData from '../../helpers/filterData.ts';
import SearchInput from '../SearchInput/SearchInput.tsx';
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { BranchType } from '../../types/apiTypes.ts';

interface ITreeView {
  data: BranchType[];
  onExtend: (id: number) => void;
}
const TreeView: FC<ITreeView> = ({ data, onExtend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<BranchType[]>(data);

  useEffect(() => {
    const filtered = filterData(data, searchTerm);
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderTree = (nodes: BranchType[]) => {
    return nodes.map((node) => (
      <div key={node.id}>
        {node.type === 'folder' && (
          <div>
            {node.name}
            {node.children?.length && (
              <button onClick={() => onExtend(node.id)}>{node.expended ? '[-]' : '[+]'}</button>
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

  return (
    <div>
      <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
      {renderTree(filteredData)}
    </div>
  );
};

export default TreeView;

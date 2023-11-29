import { useState } from 'react';
import TreeView from './components/TreeView';
import { BranchType } from './types/apiTypes.ts';
import { data } from './data/treeData.ts';
interface FolderTypeRecursive extends BranchType {
  children: BranchTypeRecursive[]; // Update the children type to support recursion
}

type BranchTypeRecursive = BranchType | FolderTypeRecursive;
function App() {
  const [dataTree, setDataTree] = useState<BranchType[]>(data);

  function toggleExpendedRecursively(
    branch: BranchType,
    targetId: number
  ): BranchTypeRecursive {
    if (branch.id === targetId && branch.type === 'folder') {
      return { ...branch, expended: !branch.expended };
    }

    if (branch.type === 'folder' && branch.children) {
      return {
        ...branch,
        children: branch.children.map((child) =>
          toggleExpendedRecursively(child, targetId)
        ),
      };
    }

    return branch;
  }

  function onExtend(id: number) {
    setDataTree((prevState) => {
      return prevState.map((item) => toggleExpendedRecursively(item, id));
    });
  }

  return (
    <>
      <div>hello world</div>
      <TreeView data={dataTree} onExtend={onExtend} />
    </>
  );
}

export default App;

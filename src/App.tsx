import { useState } from 'react';
import TreeView from './components/TreeView';
import toggleExpended from './helpers/toggleExpended.ts';
import { BranchType } from './types/apiTypes.ts';
import { data } from './data/treeData.ts';

function App() {
  const [dataTree, setDataTree] = useState<BranchType[]>(data);

  function onExtend(id: number) {
    setDataTree((prevState) => {
      return prevState.map((item) => toggleExpended(item, id));
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

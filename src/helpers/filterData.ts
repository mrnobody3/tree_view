import { BranchType } from '../types/apiTypes.ts';

export default function filterData(items: BranchType[], searchTerm: string): BranchType[] {
  return items.reduce((acc, item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const children =
      item.type === 'folder' && item.children ? filterData(item.children, searchTerm) : [];

    if (matchesSearchTerm || children.length > 0) {
      acc.push({
        ...item,
        children,
      });
    }

    return acc;
  }, [] as BranchType[]);
}

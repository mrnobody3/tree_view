import { BranchType } from '../types/apiTypes.ts';

export default function deleteItemById(id: number, items: BranchType[]): BranchType[] {
  return items.filter((item) => {
    if (item.id === id) {
      // If the item's ID matches the target ID, exclude it from the result
      return false;
    }

    if (item.type === 'folder' && item.children?.length) {
      // If the item is a folder with children, recursively delete from its children
      item.children = deleteItemById(id, item.children);
    }

    return true;
  });
}

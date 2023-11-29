type ItemType = 'folder' | 'file';

export type BranchType = {
  id: number;
  name: string;
  permissions: string[];
  type: ItemType;
  expended?: boolean;
  children?: BranchType[] | [];
};

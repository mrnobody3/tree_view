import { BranchType } from '../types/apiTypes.ts';

export default function toggleExpended(branch: BranchType, targetId: number): BranchType {
  if (branch.id === targetId && branch.type === 'folder') {
    return { ...branch, expended: !branch.expended };
  }

  if (branch.type === 'folder' && branch.children) {
    return {
      ...branch,
      children: branch.children.map((child) => toggleExpended(child, targetId)),
    };
  }

  return branch;
}

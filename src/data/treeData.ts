import { BranchType } from '../types/apiTypes.ts';

export const data: BranchType[] = [
  {
    id: 1,
    name: 'Folder 1',
    type: 'folder',
    expended: false,
    children: [
      {
        id: 2,
        name: 'File 1-1',
        type: 'file',
        permissions: ['read'],
      },
      {
        id: 3,
        name: 'Folder 1-2',
        type: 'folder',
        expended: false,
        children: [
          {
            id: 4,
            name: 'File 1-2-1',
            type: 'file',
            permissions: ['read', 'write'],
          },
        ],
        permissions: ['read'],
      },
    ],
    permissions: ['read', 'write'],
  },
  {
    id: 5,
    name: 'File 2',
    type: 'file',
    permissions: ['read', 'write', 'delete'],
  },
];

export type RoleType = 'Admin' | 'Executive' | 'Manager' | 'Technician' | 'RequestOnly';

export type AssetRole = {
  id: string;
  name: RoleType;
  roleStrength: number;
  level: number;
};

export type AdditionalPermissions = {
  [id: string]: AdditionalPermissionType;
};

export type AdditionalPermissionType = 'UserAdmin' | 'LocationAdmin';

export const userRoles: AssetRole[] = [
  {
    id: '56873d5d-6882-42e0-81a9-96657a8a2e2a',
    level: 50,
    name: 'RequestOnly',
    roleStrength: 1
  },
  {
    id: '89ba1771-37cf-450b-a351-a812c4dacc17',
    level: 40,
    name: 'Technician',
    roleStrength: 2
  },
  {
    id: 'a3e8fb8c-e28c-45c3-9c3f-4f50fa2bc56c',
    level: 30,
    name: 'Manager',
    roleStrength: 3
  },
  {
    id: 'f6c45c13-f6f5-4850-bd20-4b7edbb0275a',
    level: 20,
    name: 'Executive',
    roleStrength: 4
  },
  {
    id: 'c0f2e2a5-391a-49d1-9a6e-6af9c90370b1',
    level: 10,
    name: 'Admin',
    roleStrength: 5
  }
];

export const availableAdditionalPermissions: AdditionalPermissions = {
  '04b6faf8-f411-4a73-82eb-4e811fd87072': 'UserAdmin',
  '24099bff-144e-48fb-b4d6-2df5ecfaeee7': 'LocationAdmin'
};

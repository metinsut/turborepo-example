import { Branch } from 'store/slices/branches';
import { BranchUserCount } from 'store/slices/users/details/types';
import { apiWrapper } from './utils';
import mock from '../utils/mock';

export const branches: Branch[] = [
  {
    id: '1',
    isActive: true,
    name: 'MP - Bahçelievler'
  },
  {
    id: '2',
    isActive: true,
    name: 'Florya Hastanesi'
  },
  {
    id: '3',
    isActive: true,
    name: 'MP - Gaziosmanpaşa'
  },
  {
    id: '4',
    isActive: true,
    name: 'MP - Göztepe'
  },
  {
    id: '5',
    isActive: true,
    name: 'İstinye Ü. - Bahçeşehir'
  },
  {
    id: '6',
    isActive: true,
    name: 'MP - Fatih'
  },
  {
    id: '7',
    isActive: true,
    name: 'Maslak Hastanesi'
  },
  {
    id: '8',
    isActive: true,
    name: 'MP - Silivri'
  }
];

const branchUserCounts: BranchUserCount[] = [
  {
    branchId: '1',
    userCount: 31
  },
  {
    branchId: '2',
    userCount: 54
  },
  {
    branchId: '3',
    userCount: 92
  },
  {
    branchId: '4',
    userCount: 123
  },
  {
    branchId: '5',
    userCount: 57
  },
  {
    branchId: '6',
    userCount: 140
  },
  {
    branchId: '7',
    userCount: 12
  },
  {
    branchId: '8',
    userCount: 44
  }
];

const getRegex = /user\/users\/(\S+)\/branches$/;

apiWrapper(() => {
  mock.onGet(getRegex).reply(200, branches);
});

const currentUserBranchRegex = /user\/currentuser\/branches$/;
apiWrapper(() => {
  mock.onGet(currentUserBranchRegex).reply(200, branches);
});

const branchUserCountsRegex = /user\/currentuser\/branches-user-count$/;
apiWrapper(() => {
  mock.onGet(branchUserCountsRegex).reply(200, branchUserCounts);
});

const allBranchAuthorizationRegex = /user\/currentuser\/check-authorized-on-all-branches$/;
apiWrapper(() => {
  mock.onGet(allBranchAuthorizationRegex).reply(200, true);
});

import { apiWrapper, wrapErrorMessage } from './utils';
import { branches } from './branches';
import { locationLevels } from './data';
import mock from '../utils/mock';

const locationLevelsRegex = /location\/locationLevels\/branch\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(locationLevelsRegex).reply((config) => {
    const branchId = config.url.match(locationLevelsRegex)[1];
    const branch = branches.find((a) => a.id === branchId);

    if (!branch) {
      return [404, wrapErrorMessage('Branch is not found')];
    }

    const finalLocationLevels = locationLevels
      .filter((i) => i.branchId === branch.id)
      .sort((a, b) => a.level - b.level);

    return [200, finalLocationLevels];
  });
});

import { BranchLocationCode, Location } from 'store/slices/location/locations/types';
import { apiWrapper, wrapErrorMessage } from './utils';
import { branchLocationCodes, locations } from './data';
import { branches } from './branches';
import mock from '../utils/mock';

const branchLocationCodeRegex = /location\/branchlocationcodetypes\/branch\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(branchLocationCodeRegex).reply((config) => {
    const branchId = config.url.match(branchLocationCodeRegex)[1];
    const branch = branches.find((a) => a.id === branchId);

    if (!branch) {
      return [404, wrapErrorMessage('Branch is not found')];
    }

    const branchLocationCode = branchLocationCodes.find((a) => a.branchId === branch.id);
    if (!branchLocationCode) {
      return [404, wrapErrorMessage('Branch location code is not found')];
    }

    return [200, branchLocationCode];
  });
});

const branchLocationCodeSaveRegex = /location\/branchlocationcodetypes\/add-or-update$/;
apiWrapper(() => {
  mock.onPost(branchLocationCodeSaveRegex).reply((config) => {
    const branchLocationCode: BranchLocationCode = JSON.parse(config.data);

    const existingBranchLocationCode = branchLocationCodes.find(
      (a) => a.branchId === branchLocationCode.id
    );

    if (existingBranchLocationCode) {
      existingBranchLocationCode.branchId = branchLocationCode.branchId;
      existingBranchLocationCode.isAutoCode = branchLocationCode.isAutoCode;
    } else {
      branchLocationCodes.push(branchLocationCode);
    }

    return [200, branchLocationCode];
  });
});

const getLocationByBranchAndParentRegex = /location\/locations\/branch\/(\S+)\?parent=(\S+)$/;
apiWrapper(() => {
  mock.onGet(getLocationByBranchAndParentRegex).reply((config) => {
    const branchId = config.url.match(getLocationByBranchAndParentRegex)[1];
    const parentLocationId = config.url.match(getLocationByBranchAndParentRegex)[2];

    const branch = branches.find((a) => a.id === branchId);

    if (!branch) {
      return [404, wrapErrorMessage('Branch is not found')];
    }

    const parentLocation = locations.find((i) => i.id === parentLocationId);
    if (!parentLocation) {
      return [404, wrapErrorMessage('Parent location is not found')];
    }

    const finalLocations = locations.filter(
      (i) => i.parentLocationId === parentLocationId && i.branchId === branchId
    );

    return [200, finalLocations];
  });
});

const getLocationByBranchRegex = /location\/locations\/branch\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(getLocationByBranchRegex).reply((config) => {
    const branchId = config.url.match(getLocationByBranchRegex)[1];
    const branch = branches.find((a) => a.id === branchId);

    if (!branch) {
      return [404, wrapErrorMessage('Branch is not found')];
    }

    const finalLocations = locations.filter((i) => i.branchId === branchId && !i.parentLocationId);

    return [200, finalLocations];
  });
});

const getLocationFullPathRegex = /location\/locations\/(\S+)\/full-path$/;
apiWrapper(() => {
  mock.onGet(getLocationFullPathRegex).reply((config) => {
    const locationId = config.url.match(getLocationFullPathRegex)[1];
    const location = locations.find((a) => a.id === locationId);

    if (!location) {
      return [404, wrapErrorMessage('Location is not found')];
    }

    const flattenedLocations = flattenLocationWithAncestors(location);

    const locationNames = flattenedLocations.map((o) => o.name);
    return [200, locationNames];
  });
});

const getLocationDetailFullPathRegex = /location\/locations\/(\S+)\/detail\/full-path$/;
apiWrapper(() => {
  mock.onGet(getLocationDetailFullPathRegex).reply((config) => {
    const locationId = config.url.match(getLocationFullPathRegex)[1];
    const location = locations.find((a) => a.id === locationId);

    if (!location) {
      return [404, wrapErrorMessage('Location is not found')];
    }

    const flattenedLocations = flattenLocationWithAncestors(location);

    return [200, flattenedLocations];
  });
});

export const flattenLocationWithAncestors = (location: Location): Location[] => {
  if (!location) {
    return [];
  }

  if (!location.parentLocationId) {
    return [location];
  }

  const parentLocation = locations.find((i) => i.id === location.parentLocationId);
  return [...flattenLocationWithAncestors(parentLocation), location];
};

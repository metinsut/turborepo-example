import {
  AdditionalPermission,
  AssetManagementAuthorization,
  BranchAuthorization,
  InvitationType,
  InviteUserResponse,
  PersonalInformation,
  RequestAddUser,
  RequestInviteUser,
  ResponseAssetAuthorization,
  TermCondition,
  User
} from 'store/slices/users/details/types';
import { PagedRequestOptions, PagedResult } from 'store/common';
import { apiWrapper, wrapErrorMessage } from './utils';
import { departments, userList, users } from './data';
import { userRoles } from '../store/slices/users/common/data';
import { v4 as uuid } from 'uuid';
import mock from 'utils/mock';

const userSettingsRegex = /user\/currentuser\/settings/;
apiWrapper(() => {
  mock
    .onGet(userSettingsRegex)
    .reply(() => [200, { languageCode: 'en', locale: 'tr-TR', timeZone: '+03:00' }]);
});

const addStandardUserRegex = /user\/users\/add\/standard-user/;
apiWrapper(() => {
  mock.onPost(addStandardUserRegex).reply((config) => {
    const requestUser: RequestAddUser = JSON.parse(config.data);

    const existingUser = users.find((i) => i.email === requestUser.personalInformation.email);
    if (existingUser) {
      return [404, wrapErrorMessage('Email exists!')];
    }

    const user: User = {
      assetRole: userRoles.find((i) => i.id === requestUser.assetManagementAuthorization.roleId),
      email: requestUser.personalInformation.email,
      firstName: requestUser.personalInformation.firstName,
      id: uuid(),
      jobTitle: requestUser.personalInformation.jobTitle,
      lastName: requestUser.personalInformation.lastName,
      phoneNumber: requestUser.personalInformation.phoneNumber,
      username: requestUser.personalInformation.username,
      ...requestUser
    };

    users.push(user);
    return [200, user];
  });
});

const addGeneralAdminRegex = /user\/users\/add\/general-admin/;
apiWrapper(() => {
  mock.onPost(addGeneralAdminRegex).reply((config) => {
    const requestUser: RequestAddUser = JSON.parse(config.data);

    const existingUser = users.find((i) => i.email === requestUser.personalInformation.email);
    if (existingUser) {
      return [404, wrapErrorMessage('Email exists!')];
    }

    const user: User = {
      email: requestUser.personalInformation.email,
      firstName: requestUser.personalInformation.firstName,
      id: uuid(),
      isGeneralAdmin: true,
      jobTitle: requestUser.personalInformation.jobTitle,
      lastName: requestUser.personalInformation.lastName,
      phoneNumber: requestUser.personalInformation.phoneNumber,
      username: requestUser.personalInformation.username
    };

    users.push(user);
    return [200, user];
  });
});

const invitationIsValidRegex = /public\/user\/users\/invitation\/(\S+)\/is-valid$/;
apiWrapper(() => {
  mock.onGet(invitationIsValidRegex).reply((config) => {
    const token = config.url.match(invitationIsValidRegex)[1];
    let response = true;
    if (token === '0') {
      response = false;
    }
    return [200, response];
  });
});

const userBasicsByTokenRegex = /public\/user\/users\/(\S+)\/basics\/invitation-token\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(userBasicsByTokenRegex).reply((config) => {
    const userId = config.url.match(userBasicsByTokenRegex)[1];
    const token = config.url.match(userBasicsByTokenRegex)[1];
    if (token === '0') {
      return [400, wrapErrorMessage('Invalid token!')];
    }

    let existingUser = users.find((i) => i.id === userId);
    if (!existingUser) {
      const invitationType: InvitationType = Math.random() < 0.5 ? 'add' : 'invite';
      const email = 'test@tester.org';
      existingUser = {
        email,
        firstName: invitationType === 'add' ? 'Miley' : email,
        id: userId,
        invitationType,
        jobTitle: invitationType === 'add' ? 'Singer' : undefined,
        lastName: invitationType === 'add' ? 'Cyrus' : undefined
      };
    }

    return [200, existingUser];
  });

  mock.onPut(userBasicsByTokenRegex).reply((config) => {
    const userId = config.url.match(userBasicsByTokenRegex)[1];
    const token = config.url.match(userBasicsByTokenRegex)[1];

    const userToSave: User = JSON.parse(config.data);
    if (token === '0') {
      return [400, wrapErrorMessage('Invalid token!')];
    }

    let existingUser = users.find((i) => i.id === userId);
    if (!existingUser) {
      existingUser = {
        ...userToSave,
        id: userId
      };
      users.push(existingUser);
    } else {
      existingUser.firstName = userToSave.firstName;
      existingUser.lastName = userToSave.lastName;
      existingUser.email = userToSave.email;
      existingUser.phoneNumber = userToSave.phoneNumber;
      existingUser.jobTitle = userToSave.jobTitle;
      existingUser.invitationType = userToSave.invitationType;
    }

    return [204, null];
  });
});

const inviteStandardUserRegex = /user\/users\/invite\/standard-user/;
apiWrapper(() => {
  mock.onPost(inviteStandardUserRegex).reply((config) => {
    const inviteRequest: RequestInviteUser = JSON.parse(config.data);
    const randomIndex = Math.random() * inviteRequest.emails.length;
    const successMails = inviteRequest.emails.splice(randomIndex);
    const errorMails = inviteRequest.emails.splice(0, randomIndex);
    const response: InviteUserResponse = {
      errorUsers: errorMails.map((s) => ({
        email: s,
        message: 'email address already exists'
      })),
      successUsers: successMails.map((s) => ({
        email: s,
        message: 'invitation sent'
      }))
    };
    return [200, response];
  });
});

const inviteGeneralAdminRegex = /user\/users\/invite\/general-admin/;
apiWrapper(() => {
  mock.onPost(inviteGeneralAdminRegex).reply((config) => {
    const inviteRequest: RequestInviteUser = JSON.parse(config.data);
    const randomIndex = Math.random() * inviteRequest.emails.length;
    const successMails = inviteRequest.emails.splice(randomIndex);
    const errorMails = inviteRequest.emails.splice(0, randomIndex);
    const response: InviteUserResponse = {
      errorUsers: errorMails.map((s) => ({
        email: s,
        message: 'email address already exists'
      })),
      successUsers: successMails.map((s) => ({
        email: s,
        message: 'invitation sent'
      }))
    };
    return [200, response];
  });
});

const userSearch = /user\/users\/search$/;
apiWrapper(() => {
  mock.onPost(userSearch).reply((config) => {
    const request: PagedRequestOptions = JSON.parse(config.data);
    const { size, page } = request;
    const items = userList.slice((page - 1) * size, page * size);
    const pagedResult = {
      currentPage: page,
      items,
      size,
      statusCounts: {
        active: items.filter((i) => i.userStatus === 'active').length,
        waiting: items.filter((i) => i.userStatus === 'waiting').length
      },
      total: userList.length
    };

    return [200, pagedResult];
  });
});

const userByIdRegex = /user\/users\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(userByIdRegex).reply((config) => {
    const userId = config.url.match(userByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    return [200, user];
  });
});

const userPersonalInformationByIdRegex = /user\/users\/(\S+)\/personal-information$/;
apiWrapper(() => {
  mock.onPut(userPersonalInformationByIdRegex).reply((config) => {
    const userId = config.url.match(userPersonalInformationByIdRegex)[1];
    const personalInformation: PersonalInformation = JSON.parse(config.data);
    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    user.firstName = personalInformation.firstName;
    user.lastName = personalInformation.lastName;
    user.phoneNumber = personalInformation.phoneNumber;
    user.jobTitle = personalInformation.jobTitle;
    user.username = personalInformation.username;
    user.email = personalInformation.email;

    return [200, user];
  });
});

const userAssetAuthorizationByIdRegex = /user\/users\/(\S+)\/asset-authorization$/;
apiWrapper(() => {
  mock.onGet(userAssetAuthorizationByIdRegex).reply((config) => {
    const userId = config.url.match(userByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    const assetRole = userRoles.find((i) => i.id === user.assetManagementAuthorization.roleId);
    const assetDepartments = departments.filter((i) =>
      user.assetManagementAuthorization.departmentIds.includes(i.id)
    );
    const response: ResponseAssetAuthorization = {
      assetDepartments,
      assetRole
    };

    return [200, response];
  });

  mock.onPut(userAssetAuthorizationByIdRegex).reply((config) => {
    const userId = config.url.match(userPersonalInformationByIdRegex)[1];
    const assetManagementAuthorization: AssetManagementAuthorization = JSON.parse(config.data);
    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    user.assetManagementAuthorization = { ...assetManagementAuthorization };

    const assetRole = userRoles.find((i) => i.id === assetManagementAuthorization.roleId);
    const assetDepartments = departments.filter((i) =>
      assetManagementAuthorization.departmentIds.includes(i.id)
    );
    const response: ResponseAssetAuthorization = {
      assetDepartments,
      assetRole
    };

    return [200, response];
  });
});

const userBranchAuthorizationByIdRegex = /user\/users\/(\S+)\/branch-authorization$/;
apiWrapper(() => {
  mock.onGet(userBranchAuthorizationByIdRegex).reply((config) => {
    const userId = config.url.match(userByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    const response: BranchAuthorization = {
      ...user.branchAuthorization
    };

    return [200, response];
  });

  mock.onPut(userBranchAuthorizationByIdRegex).reply((config) => {
    const userId = config.url.match(userPersonalInformationByIdRegex)[1];
    const branchAuthorization: BranchAuthorization = JSON.parse(config.data);

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    user.branchAuthorization.branchIds = branchAuthorization.branchIds;
    user.branchAuthorization.allBranches = branchAuthorization.allBranches;

    return [200, user.branchAuthorization];
  });
});

const userAdditionalPermissionByIdRegex = /user\/users\/(\S+)\/additional-permissions$/;
apiWrapper(() => {
  mock.onGet(userAdditionalPermissionByIdRegex).reply((config) => {
    const userId = config.url.match(userByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    const response: AdditionalPermission = {
      additionalPermissions: user.additionalPermissionAuthorization.additionalPermissions
    };

    return [200, response];
  });

  mock.onPut(userAssetAuthorizationByIdRegex).reply((config) => {
    const userId = config.url.match(userPersonalInformationByIdRegex)[1];
    const request: {
      additionalPermissionIds: string[];
    } = JSON.parse(config.data);
    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    user.additionalPermissionAuthorization.additionalPermissions = [
      ...request.additionalPermissionIds
    ];

    const response: AdditionalPermission = {
      additionalPermissions: user.additionalPermissionAuthorization.additionalPermissions
    };
    return [200, response];
  });
});

const promoteByIdRegex = /user\/users\/(\S+)\/promote$/;
apiWrapper(() => {
  mock.onPut(promoteByIdRegex).reply((config) => {
    const userId = config.url.match(promoteByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    user.isGeneralAdmin = true;
    user.role = 'GeneralAdmin';
    user.assetManagementAuthorization = undefined;
    user.branchAuthorization = undefined;
    user.additionalPermissionAuthorization = undefined;
    user.assetRole = undefined;

    return [200, user];
  });
});

const demoteByIdRegex = /user\/users\/(\S+)\/demote$/;
apiWrapper(() => {
  mock.onPut(demoteByIdRegex).reply((config) => {
    const userId = config.url.match(demoteByIdRegex)[1];

    const user = users.find((i) => i.id === userId);
    if (!user) {
      return [400, wrapErrorMessage('user not found')];
    }

    const userRole = userRoles.find((i) => i.name === 'RequestOnly');

    user.isGeneralAdmin = false;
    user.assetManagementAuthorization = {
      roleId: userRole.id
    };
    user.assetRole = userRole;

    user.branchAuthorization = {
      allBranches: true,
      branchIds: []
    };
    return [200, user];
  });
});

const resignRegex = /user\/users\/resign$/;
apiWrapper(() => {
  mock.onPut(resignRegex).reply((config) => {
    const request: {
      userIds: string[];
    } = JSON.parse(config.data);
    const { userIds } = request;

    const resignedUsers: User[] = users.filter((i) => userIds.includes(i.id));
    if (resignedUsers.length !== userIds.length) {
      return [400, wrapErrorMessage('user not found')];
    }

    const anyNotActive = resignedUsers.some((i) => i.userStatus !== 'active');
    if (anyNotActive) {
      return [400, wrapErrorMessage('User Status must be Active')];
    }

    resignedUsers.forEach((u) => {
      // eslint-disable-next-line no-param-reassign
      u.userStatus = 'resigned';
    });

    return [200];
  });
});

const unresignRegex = /user\/users\/unresign$/;
apiWrapper(() => {
  mock.onPut(unresignRegex).reply((config) => {
    const request: {
      userIds: string[];
    } = JSON.parse(config.data);
    const { userIds } = request;

    const unresignedUsers: User[] = users.filter((i) => userIds.includes(i.id));
    if (unresignedUsers.length !== userIds.length) {
      return [400, wrapErrorMessage('user not found')];
    }

    const anyNotResigned = unresignedUsers.some((i) => i.userStatus !== 'resigned');
    if (anyNotResigned) {
      return [400, wrapErrorMessage('User Status must be Resigned')];
    }

    unresignedUsers.forEach((u) => {
      // eslint-disable-next-line no-param-reassign
      u.userStatus = 'active';
    });

    return [200];
  });
});

apiWrapper(() => {
  const jobTitleSearchRegex =
    /recommendation\/user\/job-title\/search\?text=(.+)&page=(\d+)&size=(\d+)$/;
  mock.onGet(jobTitleSearchRegex).reply((config) => {
    const searchText = config.url.match(jobTitleSearchRegex)[1].toLowerCase();
    const page = +config.url.match(jobTitleSearchRegex)[2];
    const size = +config.url.match(jobTitleSearchRegex)[3];

    const jobTitles = users
      .filter((i) => i.jobTitle?.toLowerCase().includes(searchText))
      .map((i) => i.jobTitle);

    const data = Array.from(new Set(jobTitles));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const getTermsConditionsRegex = /public\/user\/terms/;
  mock.onGet(getTermsConditionsRegex).reply(() => {
    const text =
      '<style>' +
      '  h2 {' +
      '    color: darkGrey' +
      ' }' +
      '  p {' +
      '    margin-top: 2em;' +
      '    margin-bottom: 2em;' +
      'line-height: 4;' +
      '  }' +
      '</style>' +
      '<div>' +
      '<h2>Terms and Conditions</h2>' +
      '<p>' +
      '<b>Part 1:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat ante vel mauris cursus tincidunt. Maecenas dapibus elementum est non bibendum. Proin tempus ipsum metus, a pulvinar ante viverra eu. Aenean tempus elit et massa condimentum, sit amet facilisis sem malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fermentum, sapien in fringilla lobortis, dui turpis pellentesque orci, a ullamcorper tellus tortor blandit sem. Vestibulum quis nulla ut lacus iaculis rutrum vel sed magna. Cras ultrices justo rhoncus diam aliquet suscipit. Pellentesque imperdiet viverra rhoncus.' +
      '</p>' +
      '<p>' +
      '<b>Part 2:</b> Aliquam ligula risus, tincidunt quis luctus non, rhoncus quis turpis. Sed tincidunt magna hendrerit, elementum sem id, tristique velit. Aenean rhoncus congue lacinia. Integer egestas sed tortor sed rhoncus. Nullam malesuada eros vel euismod commodo. Phasellus quam felis, pellentesque sed enim a, iaculis blandit eros. Sed eu risus at magna tempor pharetra.' +
      '</p>' +
      '<p>' +
      '<b>Part 3:</b> Nulla bibendum lacus nec lacus maximus consectetur. Suspendisse et laoreet arcu. Nulla tempor rutrum lectus, nec sollicitudin nulla euismod sit amet. Donec ullamcorper facilisis augue, id dapibus lectus fringilla nec. Pellentesque nec nulla mattis, luctus justo eget, feugiat sapien. Nulla laoreet, justo ut vehicula tristique, mauris ligula euismod ex, a aliquet tellus nisi in justo. Quisque facilisis, felis non convallis interdum, enim ante pretium ex, vitae aliquam sem neque a mauris. Pellentesque iaculis mollis aliquet. Maecenas blandit tellus nulla, a tempor augue tristique eu. Cras risus lacus, eleifend accumsan finibus at, fermentum a est. Proin vitae velit et turpis dictum commodo non non mauris.' +
      '</p>' +
      '</div>';

    const termCondition: TermCondition = {
      id: '92129186-ec29-4c85-8078-6f155c59139d',
      languageCode: 'en',
      startDate: '2021-06-16T12:58:47+03:00',
      text
    };

    return [200, termCondition];
  });
});

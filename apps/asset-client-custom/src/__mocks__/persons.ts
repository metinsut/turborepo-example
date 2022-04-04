import { PagedResult } from 'store/common';
import {
  Person,
  SearchByAssetIdRequest,
  SearchByAuthorizationRequest,
  SearchByBranchIdsRequest
} from 'store/slices/persons';
import { apiWrapper, wrapErrorMessage } from './utils';
import mock from '../utils/mock';

export const persons: Person[] = [
  {
    email: 'carol.warren@bordatech.com',
    firstName: 'Carol',
    id: 'c00eb414-1d0e-4129-b39c-79369fd1ec76',
    lastName: 'Warren',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'susan.ochoa@bordatech.com',
    firstName: 'Susan',
    id: 'f8a93533-846a-4cf4-8e0b-b82bfb869bcf',
    lastName: 'Ochoa',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'anton.kristoffersen@bordatech.com',
    firstName: 'Anton',
    id: 'a8aefced-bd17-4913-929d-874701e74933',
    lastName: 'Kristoffersen',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'sara.rivers@bordatech.com',
    firstName: 'Sara',
    id: '633a22c2-304d-4800-98e9-de43490471e0',
    lastName: 'Rivers',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'marcin.Majewski@bordatech.com',
    firstName: 'Marcin',
    id: '58a52be2-66ac-4bca-99af-949ae94eb8dc',
    lastName: 'Majewski',
    phoneNumber: '+44 992 99012',
    role: 'Executive'
  },
  {
    email: 'albertina.boni@bordatech.com',
    firstName: 'Albertina',
    id: '47e5bdae-9dc4-44e1-96e4-fac292688c96',
    lastName: 'Boni',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'veronica.selezneva@bordatech.com',
    firstName: 'Veronica',
    id: '33f03a31-6e66-4d83-bdac-7719d27d4787',
    lastName: 'Selezneva',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'daniel.santos@bordatech.com',
    firstName: 'Daniel Goncalves',
    id: '8',
    lastName: 'Santos',
    phoneNumber: '+44 992 99012',
    role: 'RequestOnly'
  },
  {
    email: 'lisa.mayer@bordatech.com',
    firstName: 'Lisa',
    id: 'e1425570-9d55-4317-9aa3-1c60245e91f4',
    lastName: 'Mayer',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'hanna.hyvönen@bordatech.com',
    firstName: 'Hanna',
    id: '342e0659-43ec-4602-9504-3ed9c82dff63',
    lastName: 'Hyvönen',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'mahoko.shinohara@bordatech.com',
    firstName: 'Mahoko',
    id: '2acc7731-f372-4f28-8dc3-b815069809c2',
    lastName: 'Shinohara',
    phoneNumber: '+44 992 99012',
    role: 'GeneralAdmin'
  },
  {
    email: 'fred.isaksson@bordatech.com',
    firstName: 'Fred',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    lastName: 'Isaksson',
    phoneNumber: '+44 992 99012',
    role: 'GeneralAdmin'
  },
  {
    email: 'bob.myers@bordatech.com',
    firstName: 'Bob',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    lastName: 'Myers',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  }
];

const getAvatarRegex = /user\/users\/(\S+)\/photo$/;

apiWrapper(() => {
  mock.onGet(getAvatarRegex).reply((config) => {
    const personId = config.url.match(getAvatarRegex)[1];
    const personIndex = persons.findIndex((p) => p.id === personId);

    const imageId = (personIndex + 1) % 12;
    const imageSource = `/static/images/avatars/avatar_${imageId}.png`;

    return [200, imageSource];
  });
});

const getPersonByIdRegex = /user\/users\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(getPersonByIdRegex).reply((config) => {
    const id = config.url.match(getPersonByIdRegex)[1];

    const person = persons.find((i) => i.id === id);

    if (!person) {
      return [404, wrapErrorMessage('Contract is not found')];
    }
    return [200, person];
  });
});

apiWrapper(() => {
  mock.onPost('/user/users/search/by-ids').reply((config) => {
    const ids: string[] = JSON.parse(config.data);
    const finalPersons = ids.map((i) => persons.find((p) => p.id === i));
    return [200, finalPersons];
  });
});

const searchByAuthRegex = /user\/users\/search\/by-authorizations$/;
apiWrapper(() => {
  mock.onPost(searchByAuthRegex).reply((config) => {
    const request: SearchByAuthorizationRequest = JSON.parse(config.data);
    const { size, page, fullName } = request;
    const searchText: string = fullName === ' ' ? null : fullName.toLowerCase();

    const filteredPersons = persons.filter(
      (i) =>
        !searchText ||
        i.firstName.toLowerCase().includes(searchText) ||
        i.lastName.toLowerCase().includes(searchText)
    );

    const slicedPersons = filteredPersons.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Person> = {
      currentPage: page,
      items: slicedPersons,
      size,
      total: persons.length
    };

    return [200, pagedResult];
  });
});

const searchByBranchRegex = /user\/users\/search\/by-branches$/;
apiWrapper(() => {
  mock.onPost(searchByBranchRegex).reply((config) => {
    const request: SearchByBranchIdsRequest = JSON.parse(config.data);
    const { size, page, fullName } = request;
    const searchText: string = fullName === ' ' ? null : fullName.toLowerCase();

    const filteredPersons = persons.filter(
      (i) =>
        !searchText ||
        i.firstName.toLowerCase().includes(searchText) ||
        i.lastName.toLowerCase().includes(searchText)
    );

    const slicedPersons = filteredPersons.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Person> = {
      currentPage: page,
      items: slicedPersons,
      size,
      total: persons.length
    };

    return [200, pagedResult];
  });
});

const searchAuthorizedUsersByAssetIdRegex = /breakdown\/breakdowns\/assignable-persons\/search$/;
apiWrapper(() => {
  mock.onPost(searchAuthorizedUsersByAssetIdRegex).reply((config) => {
    const request: SearchByAssetIdRequest = JSON.parse(config.data);
    const { size, page, fullName } = request;
    const searchText: string = fullName === ' ' ? null : fullName.toLowerCase();

    const filteredPersons = persons.filter(
      (i) =>
        !searchText ||
        i.firstName.toLowerCase().includes(searchText) ||
        i.lastName.toLowerCase().includes(searchText)
    );

    const slicedPersons = filteredPersons.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Person> = {
      currentPage: page,
      items: slicedPersons,
      size,
      total: persons.length
    };

    return [200, pagedResult];
  });
});

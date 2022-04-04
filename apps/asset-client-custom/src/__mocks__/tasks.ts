import { MyRequestPageRequestType } from 'store/slices/tasks/myRequests';
import { PagedRequestOptions, PagedResult } from 'store/common';
import { PagedWFCOptions } from 'store/slices/tasks/waitingForConformation/waitingForConfirmationList';
import { Person, SearchByBranchIdsRequest } from 'store/slices/persons';
import { Task } from 'store/slices/tasks/common/type';
import { apiWrapper } from './utils';
import { persons } from './persons';
import { taskList } from './data';
import mock from '../utils/mock';

const getTaskListRegex = /gw\/tasks\/task-list/;

apiWrapper(() => {
  mock.onPost(getTaskListRegex).reply((config) => {
    const request: PagedRequestOptions = JSON.parse(config.data);
    const { size, page } = request;

    const filteredTasks = taskList.filter((i) => i.status !== 'waitingForConfirmation');
    const slicedTasks = filteredTasks.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Task> = {
      currentPage: page,
      items: slicedTasks,
      size,
      total: filteredTasks.length
    };

    return [200, pagedResult];
  });
});

const getWaitingForConfirmationListRegex = /gw\/tasks\/waiting-for-confirmation-list/;

apiWrapper(() => {
  mock.onPost(getWaitingForConfirmationListRegex).reply((config) => {
    const request: PagedWFCOptions = JSON.parse(config.data);
    const { size, page } = request;

    const filteredTasks = taskList.filter((i) => i.status === 'waitingForConfirmation');
    const slicedTasks = filteredTasks.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Task> = {
      currentPage: page,
      items: slicedTasks,
      size,
      total: filteredTasks.length
    };
    return [200, pagedResult];
  });
});

const getMyRequestsRegex = /gw\/tasks\/my-request-list/;

apiWrapper(() => {
  mock.onPost(getMyRequestsRegex).reply((config) => {
    const request: MyRequestPageRequestType = JSON.parse(config.data);
    const { size, page } = request;

    const slicedTasks = taskList.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<Task> = {
      currentPage: page,
      items: slicedTasks,
      size,
      total: taskList.length
    };
    return [200, pagedResult];
  });
});

const searchTaskUsersByBranchRegex = /breakdown\/breakdowns\/users\/search\/by-branches$/;
apiWrapper(() => {
  mock.onPost(searchTaskUsersByBranchRegex).reply((config) => {
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

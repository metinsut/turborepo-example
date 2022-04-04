import { AssignmentInformation, BreakdownCost } from 'store/slices/breakdown/common/types';
import { History, TaskDetailInformation } from 'store/slices/breakdown/taskDetail/types';
import { MyRequestInformation } from 'store/slices/breakdown/myRequest/types';
import { StatusKeys, Task } from 'store/slices/tasks/common/type';
import { WaitingForConfirmationInformation } from 'store/slices/breakdown/waitingForConfirmation/types';
import { allTypes } from './taskConfiguration/breakdown/breakdownTypes';
import { apiWrapper, wrapErrorMessage } from './utils';
import { categories, locations, taskList } from './data';
import { flattenAllCategoriesRecursively } from './categories';
import { flattenLocationWithAncestors } from './locations';
import { persons } from './persons';
import { selectableTaskStatuses } from './taskConfiguration/breakdown/breakdownSubstatuses';
import mock from '../utils/mock';

const fetchUserAuthorized = /breakdown\/breakdowns\/is-user-authorized\/asset\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(fetchUserAuthorized).reply(() => [200, true]);
});

apiWrapper(() => {
  mock.onPost('breakdown/breakdowns/authorized').reply((config) => {
    const responseBody: Task = JSON.parse(config.data);
    const newTaskId = taskList[taskList.length - 1].id + 1;
    const newAssetSerialNo = `F${taskList[taskList.length - 1].code}${1}`;
    const newTask: Task = {
      ...responseBody,
      brandName: 'Brand',
      categoryName: 'Ventilators',
      code: newAssetSerialNo,
      id: newTaskId,
      responsiblePersonnel: {
        firstName: 'Darrel',
        id: '32a5ewae-9dc4-44e1-43e4-sdac078688c96',
        lastName: 'Steward'
      },
      status: 'paused',
      taskType: 'breakdown'
    };
    taskList.push(newTask);
    return [200, newTaskId];
  });
});

const wfcDetailById = /gw\/breakdown\/breakdowns\/(\S+)\/waiting-for-confirmation-detail$/;
apiWrapper(() => {
  mock.onGet(wfcDetailById).reply((config) => {
    const breakdownId = config.url.match(wfcDetailById)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const wfcInfo = convertTaskToWFCInfo(breakdownTask);
    return [200, wfcInfo];
  });
});

const myRequestDetailById = /gw\/breakdown\/breakdowns\/(\S+)\/my-request-detail$/;
apiWrapper(() => {
  mock.onGet(myRequestDetailById).reply((config) => {
    const breakdownId = config.url.match(myRequestDetailById)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const myRequestInfo = convertTaskToMyRequestInfo(breakdownTask);
    return [200, myRequestInfo];
  });
});

const taskDetailById = /gw\/breakdown\/breakdowns\/(\S+)\/task-detail$/;
apiWrapper(() => {
  mock.onGet(taskDetailById).reply((config) => {
    const breakdownId = config.url.match(taskDetailById)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const taskDetail = convertTaskToTaskDetail(breakdownTask);
    return [200, taskDetail];
  });
});

const updateTaskDetailTypeByBreakdownId = /breakdown\/breakdowns\/(\S+)\/type$/;
apiWrapper(() => {
  mock.onPut(updateTaskDetailTypeByBreakdownId).reply((config) => {
    const breakdownId = config.url.match(updateTaskDetailTypeByBreakdownId)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const taskDetail = convertTaskToTaskDetail(breakdownTask);
    const { breakdownTypeId } = JSON.parse(config.data);
    const typeName = allTypes.find((type) => type.id === breakdownTypeId.toString()).name;
    taskDetail.breakdownInformation.breakdownType = typeName;
    taskDetail.breakdownInformation.breakdownTypeId = breakdownTypeId;
    return [200, taskDetail.breakdownInformation];
  });
});

const updateUsabilityByBreakdownId = /breakdown\/breakdowns\/(\S+)\/usability$/;
apiWrapper(() => {
  mock.onPut(updateUsabilityByBreakdownId).reply((config) => {
    const breakdownId = config.url.match(updateUsabilityByBreakdownId)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const { usability } = JSON.parse(config.data);
    breakdownTask.usability = usability;
    const taskDetail = convertTaskToTaskDetail(breakdownTask);

    return [200, taskDetail.breakdownInformation];
  });
});

const updateAssignmentByBreakdownId = /breakdown\/breakdowns\/(\S+)\/assignment$/;
apiWrapper(() => {
  mock.onPut(updateAssignmentByBreakdownId).reply((config) => {
    const breakdownId = config.url.match(updateUsabilityByBreakdownId)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const {
      responsiblePersonnelId,
      assistantPersonnelIds
    }: {
      responsiblePersonnelId: string;
      assistantPersonnelIds: string[];
    } = JSON.parse(config.data);

    const responsbilePersonnel = persons.find((i) => i.id === responsiblePersonnelId);
    const assistantPersonnells = persons.filter((i) => assistantPersonnelIds.includes(i.id));
    breakdownTask.responsiblePersonnel = responsbilePersonnel;
    breakdownTask.assistantPersonnels = assistantPersonnells;
    const taskDetail = convertTaskToTaskDetail(breakdownTask);

    return [200, taskDetail.breakdownInformation];
  });
});

const confirmBreakdownRegex = /breakdown\/breakdowns\/(\S+)\/confirm$/;
apiWrapper(() => {
  mock.onPut(confirmBreakdownRegex).reply((config) => {
    const breakdownId = config.url.match(confirmBreakdownRegex)[1];
    const assignmentInformation: AssignmentInformation = JSON.parse(config.data);
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const respPerson = persons.find((i) => i.id === assignmentInformation.responsiblePersonnelId);
    breakdownTask.priority = assignmentInformation.priority;
    breakdownTask.responsiblePersonnel = respPerson;
    breakdownTask.status = 'open';

    return [200, breakdownTask];
  });
});

const denyBreakdownRegex = /breakdown\/breakdowns\/(\S+)\/deny$/;
apiWrapper(() => {
  mock.onPut(denyBreakdownRegex).reply((config) => {
    const breakdownId = config.url.match(denyBreakdownRegex)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    breakdownTask.status = 'denied';

    return [200, breakdownTask];
  });
});

const commitBreakdownRegex = /breakdown\/breakdowns\/(\S+)\/commit$/;
apiWrapper(() => {
  mock.onPut(commitBreakdownRegex).reply((config) => {
    const breakdownId = config.url.match(commitBreakdownRegex)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const respPerson = persons.find((i) => i.id === '3fa85f64-5717-4562-b3fc-2c963f66afa7');
    breakdownTask.responsiblePersonnel = respPerson;
    breakdownTask.status = 'open';
    return [204, null];
  });
});

const updateStatusRegex = /breakdown\/breakdowns\/(\S+)\/status$/;
apiWrapper(() => {
  mock.onPut(updateStatusRegex).reply((config) => {
    const breakdownId = config.url.match(updateStatusRegex)[1];
    const breakdownTask = taskList.find((i) => i.id === breakdownId);
    const data: {
      status: StatusKeys;
      substatusId: string;
    } = JSON.parse(config.data);

    if (!breakdownTask) {
      return [404, wrapErrorMessage('No task info!')];
    }

    const status = selectableTaskStatuses.find((i) => i.key === data.status);
    const substatus = status.substatuses.find((i) => i.id === data.substatusId);

    breakdownTask.substatus = substatus?.name ?? undefined;
    breakdownTask.substatusId = substatus?.id ?? undefined;
    breakdownTask.status = status.key;

    return [204, null];
  });
});

const breakdownCostCreateRegex = /breakdown\/breakdowns\/(\S+)\/costs$/;
apiWrapper(() => {
  mock.onPost(breakdownCostCreateRegex).reply((config) => {
    const breakdownCost: BreakdownCost = JSON.parse(config.data);
    const breakdownId = config.url.match(breakdownCostCreateRegex)[1];

    if (!breakdownId) {
      return [404, wrapErrorMessage('No task info!')];
    }
    if (breakdownCost === null) {
      return [400, wrapErrorMessage('Cost info is required!')];
    }
    taskDetailCosts.push(breakdownCost);

    return [204, null];
  });
  mock.onGet(breakdownCostCreateRegex).reply((config) => {
    const breakdownId = config.url.match(breakdownCostCreateRegex)[1];
    const task = taskList.find((t) => t.id === breakdownId);

    if (!task) {
      return [404, wrapErrorMessage('No task info!')];
    }

    return [200, convertTaskToTaskDetail(task).breakdownInformation];
  });
});

const breakdownCostRegex = /breakdown\/breakdowns\/(\S+)\/costs\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(breakdownCostRegex).reply((config) => {
    const breakdownCostId = config.url.match(breakdownCostRegex)[2];
    if (breakdownCostId === null) {
      return [400, wrapErrorMessage('Cost info is required!')];
    }
    const index = taskDetailCosts.findIndex((c) => c.id === breakdownCostId);
    if (index === -1) {
      return [400, wrapErrorMessage('Cost not found')];
    }
    taskDetailCosts.splice(index, 1);

    return [204, null];
  });
  mock.onPut(breakdownCostRegex).reply((config) => {
    const breakdownCost: BreakdownCost = JSON.parse(config.data);
    const breakdownCostId = config.url.match(breakdownCostRegex)[2];
    if (breakdownCost === null) {
      return [400, wrapErrorMessage('Cost info is required!')];
    }
    if (
      breakdownCost.explanation === null ||
      breakdownCost.costTypeId === null ||
      breakdownCost.amount === null
    ) {
      return [400, wrapErrorMessage('All requered fields should be filled!')];
    }
    const index = taskDetailCosts.findIndex((c) => c.id === breakdownCostId);
    if (index === -1) {
      return [400, wrapErrorMessage('Cost not found')];
    }
    taskDetailCosts.splice(index, 1, breakdownCost);
    return [204, null];
  });
});

const convertTaskToWFCInfo = (task: Task) => {
  const category = categories.find((i) => i.name === task.categoryName);
  const location = locations.find((i) => i.id === task.locationId);
  const locationArray = location ? flattenLocationWithAncestors(location) : [];
  const requester = persons[0];
  const wfcInfo: WaitingForConfirmationInformation = {
    assetInformation: {
      branchId: '1',
      brandName: task.brandName,
      categories: flattenAllCategoriesRecursively(category),
      code: task.code,
      contract: {
        endDate: '2022-03-14T12:58:47+03:00',
        firmContact: {
          contactPerson: 'John Maus',
          email: 'john.maus@benningtons.com',
          firmName: 'Benningtons',
          phone: '+44 789 41593'
        },
        partsPolicy: {
          partList: ['part1', 'part2', 'part3'],
          partPolicyType: 'somePartsIncluded'
        },
        startDate: '2021-03-14T12:58:47+03:00',
        type: 'warranty'
      },
      id: task.assetId,
      locations: locationArray,
      modelName: task.modelName
    },
    breakdownInformation: {
      explanation: 'This thing is broken, needed to be changed ASAP',
      id: task.id,
      requestDate: '2021-12-01T12:58:47+03:00',
      requesterPerson: {
        email: requester.email,
        firstName: requester.firstName,
        fullName: `${requester.firstName} ${requester.lastName}`,
        id: requester.id,
        jobTitle: requester.role,
        lastName: requester.lastName,
        phone: requester.phoneNumber
      },
      requesterUsability: 'usable',
      usability: 'notUsable'
    }
  };

  return wfcInfo;
};

const convertTaskToMyRequestInfo = (task: Task) => {
  const category = categories.find((i) => i.name === task.categoryName);
  const location = locations.find((i) => i.id === task.locationId);
  const locationArray = location ? flattenLocationWithAncestors(location) : [];
  const requester = persons[0];
  const myRequestInfo: MyRequestInformation = {
    assetInformation: {
      branchId: '1',
      brandName: task.brandName,
      categories: flattenAllCategoriesRecursively(category),
      code: task.code,
      contract: {
        endDate: '2022-03-14T12:58:47+03:00',
        firmContact: {
          contactPerson: 'John Maus',
          email: 'john.maus@benningtons.com',
          firmName: 'Benningtons',
          phone: '+44 789 41593'
        },
        partsPolicy: {
          partList: ['part1', 'part2', 'part3'],
          partPolicyType: 'somePartsIncluded'
        },
        startDate: '2021-03-14T12:58:47+03:00',
        type: 'warranty'
      },
      id: task.assetId,
      locations: locationArray,
      modelName: task.modelName,
      modelPhotoPath: ''
    },
    breakdownInformation: {
      denyExplanation:
        'This request has been opened before, so I denied this one. My team is still working on the issue. Please be patient.',
      explanation: 'This thing is broken, needed to be changed ASAP',
      id: task.id,
      requestDate: '2021-12-01T12:58:47+03:00',
      requesterPerson: {
        email: requester.email,
        firstName: requester.firstName,
        fullName: `${requester.firstName} ${requester.lastName}`,
        id: requester.id,
        jobTitle: requester.role,
        lastName: requester.lastName,
        phone: requester.phoneNumber
      },
      requesterUsability: 'usable',
      usability: 'notUsable'
    },
    taskStatusInformation: {
      assistantPersonnels: task.assistantPersonnels,
      responsiblePerson: task.responsiblePersonnel,
      status: task.status,
      substatus: 'External Intervention',
      substatusId: '23jh-e9e1-krwe32a'
    }
  };

  return myRequestInfo;
};

const taskDetailCosts = [
  {
    amount: 348,
    costType: 'Currency Conversion Cost',
    costTypeId: '10',
    explanation: 'Secondary Pump',
    id: '123',
    parentCostType: 'Internal Cost',
    parentCostTypeId: '1'
  },
  {
    amount: 250,
    costType: 'Part Cost',
    costTypeId: '9',
    explanation: 'Disabled Cost',
    id: '234',
    parentCostType: 'Internal Cost',
    parentCostTypeId: '1'
  }
];

const taskDetailHistoryInfo: History[] = [
  {
    createdDate: '2021-01-20T11:47:35.370Z',
    createdPerson: persons[1],
    details: [
      {
        historySubKey: 'Explanation',
        newValue: 'Beeps more silently',
        oldValue: 'Beeps'
      },
      {
        historySubKey: 'Cost Type',
        newValue: 'External',
        oldValue: 'Internal'
      },
      {
        historySubKey: 'Amount',
        newValue: '234',
        oldValue: '123'
      }
    ],
    historyKey: 'Cost Changed',
    historyType: 'Cost',
    historyTypeKey: 'cost'
  },
  {
    createdDate: '2022-01-11T12:32:17.370Z',
    createdPerson: persons[0],
    details: [
      {
        newValue: 'Usable',
        oldValue: 'Not Usable'
      }
    ],
    historyKey: 'Usability status was changed',
    historyType: 'Usability',
    historyTypeKey: 'usability'
  },
  {
    createdDate: '2022-01-08T10:15:34.370Z',
    createdPerson: persons[0],
    details: [
      {
        newValue: `${persons[1].firstName} ${persons[1].lastName}`
      }
    ],
    historyKey: 'Task was assigned',
    historyType: 'Assignment',
    historyTypeKey: 'assignment'
  },
  {
    createdDate: '2022-01-03T12:32:21.370Z',
    createdPerson: persons[0],
    details: [
      {
        newValue: 'In Progress / Internal Intervention',
        oldValue: 'Open'
      }
    ],
    historyKey: 'Status was changed',
    historyType: 'Status',
    historyTypeKey: 'status'
  },
  {
    createdDate: '2022-01-01T10:11:21.370Z',
    createdPerson: persons[0],
    details: [],
    historyKey: 'Task was created',
    historyType: 'Information',
    historyTypeKey: 'information'
  }
];

const convertTaskToTaskDetail = (task: Task) => {
  const category = categories.find((i) => i.name === task.categoryName);
  const location = locations.find((i) => i.id === task.locationId);
  const locationArray = location ? flattenLocationWithAncestors(location) : [];
  const requester = persons[0];
  const responsbile = persons[2];
  const taskDetailInfo: TaskDetailInformation = {
    assetInformation: {
      branchId: '1',
      brandName: task.brandName,
      categories: flattenAllCategoriesRecursively(category),
      code: task.code,
      contract: {
        endDate: '2022-03-14T12:58:47+03:00',
        firmContact: {
          contactPerson: 'John Maus',
          email: 'john.maus@benningtons.com',
          firmName: 'Benningtons',
          phone: '+44 789 41593'
        },
        partsPolicy: {
          partList: ['part1', 'part2', 'part3', 'part 8 ', 'monitor', 'coffee holder'],
          partPolicyType: 'somePartsIncluded'
        },
        startDate: '2021-03-14T12:58:47+03:00',
        type: 'lease'
      },
      id: task.assetId,
      locations: locationArray,
      modelName: task.modelName,
      modelPhotoPath: ''
    },
    breakdownInformation: {
      assignerNote: 'This is the note from manage',
      breakdownCosts: taskDetailCosts,
      breakdownType: 'Electronic Breakdown',
      breakdownTypeId: '1',
      denyExplanation:
        'This request has been opened before, so I denied this one. My team is still working on the issue. Please be patient.',
      explanation: 'This thing is broken, needed to be changed ASAP',
      id: task.id,
      requestDate: '2021-12-01T12:58:47+03:00',
      requesterPerson: {
        email: requester.email,
        firstName: requester.firstName,
        fullName: `${requester.firstName} ${requester.lastName}`,
        id: requester.id,
        jobTitle: requester.role,
        lastName: requester.lastName,
        phone: requester.phoneNumber
      },
      requesterUsability: 'usable',
      responsibleManager: {
        email: responsbile.email,
        firstName: responsbile.firstName,
        fullName: `${responsbile.firstName} ${responsbile.lastName}`,
        id: responsbile.id,
        jobTitle: responsbile.role,
        lastName: responsbile.lastName,
        phone: responsbile.phoneNumber
      },
      usability: task.usability
    },
    history: {
      currentPage: 1,
      items: taskDetailHistoryInfo,
      size: 5,
      total: taskDetailHistoryInfo.length
    },
    taskStatusInformation: {
      assistantPersonnels: task.assistantPersonnels,
      responsiblePerson: task.responsiblePersonnel,
      status: task.status,
      substatus: 'External Intervention',
      substatusId: '23jh-e9e1-krwe32a'
    }
  };

  return taskDetailInfo;
};

const breakdownHistoryRegex = /gw\/breakdown\/breakdowns\/(\S+)\/update-histories/;
apiWrapper(() => {
  mock.onGet(breakdownHistoryRegex).reply((config) => {
    const taskId = config.url.match(breakdownHistoryRegex)[1];
    const task = taskList.find((t) => t.id === taskId);

    if (!task) {
      return [404, wrapErrorMessage('No task info!')];
    }

    return [200, convertTaskToTaskDetail(task).history];
  });
});

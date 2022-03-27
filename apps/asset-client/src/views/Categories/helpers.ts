import React from 'react';

export type CategoryManagementType = 'page' | 'selector' | 'checker';

export function useBodyClickActions(managementType: CategoryManagementType, checkMode: boolean) {
  const actionStatuses = React.useMemo(() => {
    let expandBodyActionEnabled = false;
    let selectBodyActionEnabled = false;

    switch (managementType) {
      case 'selector':
        expandBodyActionEnabled = true;
        selectBodyActionEnabled = true;
        break;
      case 'checker':
        selectBodyActionEnabled = true;
        break;
      case 'page':
        expandBodyActionEnabled = !checkMode;
        selectBodyActionEnabled = checkMode;
        break;
      default:
        break;
    }

    return {
      expandBodyActionEnabled,
      selectBodyActionEnabled
    };
  }, [checkMode, managementType]);

  return actionStatuses;
}

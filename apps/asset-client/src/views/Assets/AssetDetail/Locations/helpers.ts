import React from 'react';

export type LocationManagementType = 'selector' | 'checker';

export function useBodyClickActions(managementType: LocationManagementType) {
  const actionStatuses = React.useMemo(() => {
    const expandBodyActionEnabled = false;
    let selectBodyActionEnabled = false;

    switch (managementType) {
      case 'selector':
        selectBodyActionEnabled = true;
        break;
      case 'checker':
        selectBodyActionEnabled = true;
        break;
      default:
        break;
    }

    return {
      expandBodyActionEnabled,
      selectBodyActionEnabled
    };
  }, [managementType]);

  return actionStatuses;
}

import MultiPersonSelector, { Props as MultiSelectorProps } from './MultiPersonSelector';
import React, { useCallback, useMemo } from 'react';

type Props = Omit<
  MultiSelectorProps,
  'personIds' | 'multiSelect' | 'onPersonsRemove' | 'onPersonSelect'
> & {
  onPersonRemove?: () => void;
  onPersonSelect?: (personId: string) => void;
  personId: string;
  editable?: boolean;
};

function SinglePersonSelector(props: Props) {
  const { onPersonRemove, onPersonSelect, editable, personId, ...rest } = props;

  const multiPersonIds = useMemo(() => (!personId ? [] : [personId]), [personId]);

  const handlePersonsSelect = useCallback(
    async (personIds: string[]) => {
      await onPersonSelect(personIds[0]);
    },
    [onPersonSelect]
  );

  return (
    <MultiPersonSelector
      editable={editable}
      multiSelect={false}
      onPersonSelect={handlePersonsSelect}
      onPersonsRemove={onPersonRemove}
      personIds={multiPersonIds}
      {...rest}
    />
  );
}

export default SinglePersonSelector;

import { CatChip } from 'catamaran/core';
import { removeInformationModel } from 'store/slices/asset/filter/slice';
import { selectModelById } from 'store/slices/models';
import { useTypedDispatch, useTypedSelector } from 'hooks';

interface Props {
  modelId?: string;
  brandId?: string;
}

const ModelChip = ({ modelId, brandId }: Props) => {
  const dispatch = useTypedDispatch();
  const model = useTypedSelector((state) => selectModelById(state, modelId));

  return (
    <CatChip
      label={model?.name}
      onDelete={() => dispatch(removeInformationModel({ brandId, modelId }))}
    />
  );
};

export default ModelChip;

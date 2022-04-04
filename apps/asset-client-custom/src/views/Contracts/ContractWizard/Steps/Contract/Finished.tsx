import { gotoNextStep } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch } from 'hooks';
import React, { useEffect } from 'react';

function Finished() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(gotoNextStep());
  }, [dispatch]);

  return <></>;
}

export default Finished;

import { login } from 'store/slices/session';
import { useHistory } from 'react-router-dom';
import { useTypedDispatch } from 'hooks';
import React, { useEffect } from 'react';
import Redirecting from './Redirecting';

function Callback() {
  const history = useHistory();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const asyncCallback = async () => {
      try {
        await dispatch(login());
      } finally {
        history.push('/');
      }
    };

    asyncCallback();
  }, [history, dispatch]);

  return <Redirecting />;
}

export default Callback;

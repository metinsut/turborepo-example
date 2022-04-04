import { getUserManager } from 'utils/userManager';
import { useEffect } from 'react';

function Login(): any {
  useEffect(() => {
    const asyncCall = async () => {
      const userManager = await getUserManager();
      userManager.signinRedirect();
    };

    asyncCall();
  }, []);

  return null;
}

export default Login;

import { StoreThunkDispatch } from 'RootTypes';
import { useDispatch } from 'react-redux';

export const useTypedDispatch = () => useDispatch<StoreThunkDispatch>();

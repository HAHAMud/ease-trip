import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../constants';
import { getUser } from './user';

export const useGetUser = () => {
  return useQuery({ queryKey: [QueryKey.GetUser], queryFn: getUser });
};

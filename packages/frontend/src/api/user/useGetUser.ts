import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';
import { QueryKey } from '..';

export const useGetUser = () => {
  return useQuery({ queryKey: [QueryKey.GetUser], queryFn: getUser });
};

import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { getUser } from './user';

export const useGetUser = () => {
  return useQuery({ queryKey: [QueryKey.getUser], queryFn: getUser });
};

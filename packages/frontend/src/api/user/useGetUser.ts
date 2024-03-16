import { useQuery } from '@tanstack/react-query';
import { QueryKey, getUser } from './user';

export const useGetUser = () => {
  return useQuery({ queryKey: [QueryKey.GET_USER], queryFn: getUser });
};

import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';

enum QueryKey {
  GetUser = 'getUser',
}

export const useGetUser = () => {
  return useQuery({ queryKey: [QueryKey.GetUser], queryFn: getUser });
};

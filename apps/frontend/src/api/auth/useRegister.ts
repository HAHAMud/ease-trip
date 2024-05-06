import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../constants';
import { checkEmail } from './register';

export const useCheckEmail = (email: string, options?: { enabled: boolean }) => {
  return useQuery({
    queryKey: [QueryKey.CheckEmail, email],
    queryFn: () => checkEmail({ email }),
    enabled: options?.enabled,
  });
};

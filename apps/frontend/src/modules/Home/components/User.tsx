import { useEffect } from 'react';
import { useGetUser } from '@/api/user';
import { getUser } from '@/api/user/user';

export function User() {
  const { data } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return <div>{data?.name}</div>;
}

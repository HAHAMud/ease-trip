import { useGetUser } from '@/api/user';
import { getUser } from '@/api/user/user';
import { useEffect } from 'react';

export function User() {
  const { data } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return <div>{data?.name}</div>;
}

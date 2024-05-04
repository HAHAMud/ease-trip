import { useEffect } from 'react';
import { useGetUser } from '@/modules/Home/apis';
import { getUser } from '../apis/user';

export function User() {
  const { data } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return <div>{data?.name}</div>;
}

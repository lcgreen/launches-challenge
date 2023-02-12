import { fetcher } from '@@/lib/api';
import useSWR from 'swr';

const useLaunches = () => {
  const { data, error, isLoading } = useSWR(`/api/launches`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useLaunches;
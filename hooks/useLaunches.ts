import { Launch } from '@@/api/services/launches';
import { fetcher } from '@@/lib/api';
import useSWR from 'swr';

const useLaunches = (): {
  data: {
    body: Launch[],
  },
  isLoading: boolean,
  isError: boolean
} => {
  const { data, error, isLoading } = useSWR(`/api/launches`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useLaunches;
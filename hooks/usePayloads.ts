import { fetcher } from '@@/lib/api';
import useSWR from 'swr';

const usePayloads = () => {
  const { data, error, isLoading } = useSWR(`/api/payloads`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default usePayloads;
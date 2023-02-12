export const fetcher = async (url) => {
  const response = await fetch(url).then((res) => res.json());
  if (!response.ok) {
    throw new Error('Failed to fetch API');
  }
  return response;
};

import { useNrqlQuery, NrqlQuery } from "nr1";

export const useNRQL = (args) => {
  const {
    accountId,
    pollInterval = NrqlQuery.AUTO_POLL_INTERVAL,
    query,
    skip = false,
  } = args;

  const { data, error, loading } = useNrqlQuery({
    accountIds: [accountId],
    pollInterval,
    query,
    skip,
  });

  return {
    data,
    error,
    loading,
  };
};

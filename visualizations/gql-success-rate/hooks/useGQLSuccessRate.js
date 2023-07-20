import { useMemo } from "react";
import { useNRQL } from "../../../hooks/useNRQL";
import { EXCLUDE_KEYS_NRQL } from "../../../constants";

//

export const useGQLSuccessRate = (args) => {
  const { operation, accountId } = args;

  const { data, loading, error } = useNRQL({
    accountId,
    query: `SELECT percentage(count(*), WHERE success = 1) FROM NerdpackSampleData WHERE operation = '${operation}' SINCE 1 month ago`,
  });

  // console.log(JSON.stringify(data, null, 2));

  const { percentage, type } = useMemo(() => {
    if (loading || error !== null) {
      return { percentage: undefined, type: undefined };
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const [firstItem] = data;

      if (
        Object.prototype.hasOwnProperty.call(firstItem, "data") &&
        Array.isArray(firstItem.data) &&
        firstItem.data.length > 0
      ) {
        const {
          data: [currentData],
        } = firstItem;

        const usedKey = Object.keys(currentData).find(
          (v) => !EXCLUDE_KEYS_NRQL.includes(v)
        );
        const value = currentData[usedKey]
          ? Number(usedKey ? currentData[usedKey] : 0) * 100
          : null;
        let type = "danger";

        if (value > 90) type = "success";
        else if (value > 85) type = "warning";

        if (value !== null) {
          return { percentage: Number(value.toFixed(2)), type };
        }
      }
    }

    return { percentage: 0, type: "danger" };
  }, [data]);

  return {
    loading,
    data: { percentage, type },
    error:
      typeof error === "object" &&
      error !== null &&
      Object.prototype.hasOwnProperty.call(error, "message")
        ? error.message
        : undefined,
  };
};

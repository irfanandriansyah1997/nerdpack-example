import React, { useCallback, useRef } from "react";
import { BlockText, HeadingText, Spinner } from "nr1";

import { cx } from "../../utils";
import illustrationGraphql from "../../assets/illustration-graphql.png";

import { useGQLSuccessRate } from "./hooks/useGQLSuccessRate";
import GQLSuccessRateDialog from "./components/GQLSuccessRateDialog";

const GQLSuccessRate = (props) => {
  const { operation, accountId, threshold } = props;

  const {
    loading,
    data: { percentage, type },
    error,
  } = useGQLSuccessRate({ accountId, operation });
  const dialogRef = useRef();

  const handleOnClickCard = useCallback(
    (e) => {
      e.preventDefault();

      if (dialogRef.current) {
        dialogRef.current.openDialog({ accountId, operation });
      }
    },
    [accountId, operation]
  );

  return (
    <>
      <div
        onClick={handleOnClickCard}
        className={cx({
          "gql-success-rate": true,
          "gql-success-rate--loading": loading,
          "gql-success-rate--error": typeof error === "string",
          [`gql-success-rate--layout-${type}`]: Boolean(type),
        })}
      >
        {loading && <Spinner className="gql-success-rate__shimmer" />}
        {percentage !== undefined && (
          <div className="gql-success-rate__text">
            <HeadingText type={HeadingText.TYPE.HEADING_2}>
              {percentage}%
            </HeadingText>
            <BlockText>Success Rate Percentage</BlockText>
            <b>Sample Changes</b>
          </div>
        )}
        <img src={illustrationGraphql} alt="GQL Success Rate" />
      </div>
      <GQLSuccessRateDialog ref={dialogRef} />
    </>
  );
};

export default GQLSuccessRate;

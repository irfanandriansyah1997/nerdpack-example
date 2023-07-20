import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Badge,
  PieChart,
  BlockText,
  HeadingText,
  Modal,
  TableChart,
} from "nr1";

const GQLSuccessRateDialog = forwardRef((_, ref) => {
  const [{ accountId, operation }, setParameter] = useState({});
  const [display, toggleDialog] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openDialog: (args) => {
        setParameter({
          accountId: args.accountId,
          operation: args.operation,
        });
        toggleDialog(true);
      },
    };
  });

  const handleOnClose = () => {
    setParameter({});
    toggleDialog(false);
  };

  return (
    <Modal hidden={!display} onClose={handleOnClose}>
      <div className="gql-success-rate-dialog">
        <div className="gql-success-rate-dialog__header">
          <HeadingText type={HeadingText.TYPE.HEADING_3}>
            GQL Success Rate
          </HeadingText>
          {accountId && <Badge type={Badge.TYPE.INFO}>{accountId}</Badge>}
        </div>
        {Boolean(accountId && operation) && (
          <div className="gql-success-rate-dialog__content">
            <div className="gql-success-rate-dialog__content-row">
              <section>
                <HeadingText type={HeadingText.TYPE.HEADING_4}>
                  Overview
                </HeadingText>
                <BlockText type={HeadingText.TYPE.HEADING_4}>
                  GQL comparison between error and success occurrences
                </BlockText>
              </section>
              <PieChart
                accountIds={[accountId]}
                query={`SELECT count(*) FROM NerdpackSampleData WHERE operation = '${operation}' FACET CASES (WHERE success = 1 as 'Success Request', WHERE success = 0 as 'Failure Request') as 'Success' SINCE 1 month ago`}
              />
            </div>
            <div className="gql-success-rate-dialog__content-row">
              <section>
                <HeadingText type={HeadingText.TYPE.HEADING_4}>
                  Error Occurrences
                </HeadingText>
                <BlockText type={HeadingText.TYPE.HEADING_4}>
                  Error message occurrences on GQL <pre>{operation}</pre> query
                </BlockText>
              </section>
              <TableChart
                accountIds={[accountId]}
                query={`SELECT count(*) FROM NerdpackSampleData FACET operationErr WHERE operation = '${operation}' AND success = 0 LIMIT MAX SINCE 1 month ago`}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
});

export default GQLSuccessRateDialog;

import React, { FC, useContext } from "react";
import { DocumentNav } from "./DocumentNav";
import { FileName } from "./FileName";
import { DocViewerContext } from "../state";
import { nextDocument, previousDocument } from "../state/actions";

export const HeaderBar: FC<{}> = () => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { config } = state;

  if (config?.header?.disableHeader) return null;

  const override = config?.header?.overrideComponent?.(
    state,
    () => dispatch(previousDocument()),
    () => dispatch(nextDocument())
  );

  if (override) {
    return override;
  } else {
    return (
      <div className="flex justify-end z-10 p-1 md:py-3 md:min-h-[50px] min-h-[30px]" >
        <FileName />
        <DocumentNav />
      </div>
    );
  }
};



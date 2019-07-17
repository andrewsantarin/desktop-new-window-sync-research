import React, { Fragment, FunctionComponent } from 'react';

export const URL_PATH = '/detachable';

export const Detachable: FunctionComponent<{}> = ({ children }) => {
  return (
    <Fragment>
      <h2>Detachable</h2>
      {children}
    </Fragment>
  );
};

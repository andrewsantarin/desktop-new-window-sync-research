import React, { Fragment, FunctionComponent } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { RootState } from './Root.reducer';

import { createValueService } from './Value.state';
import { useMount } from './Value.hooks';

// Components
export type ValueApiStateProps = {
};

export type ValueApiDispatchProps = {
  createValueService(): void;
};

export type ValueApiOwnProps = {

};

export type ValueApiProps = ValueApiStateProps & ValueApiDispatchProps & ValueApiOwnProps;

export const ValueApi: FunctionComponent<ValueApiProps> = ({ createValueService, children }) => {
  useMount(() => {
    createValueService();
  });

  return (
    <Fragment>
      {children}
    </Fragment>
  )
};

const mapStateToProps: MapStateToProps<ValueApiStateProps, ValueApiOwnProps, RootState> = () => ({
});

const mapDispatchToProps: MapDispatchToProps<ValueApiDispatchProps, ValueApiOwnProps> = {
  createValueService,
};

export const ValueApiContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValueApi);

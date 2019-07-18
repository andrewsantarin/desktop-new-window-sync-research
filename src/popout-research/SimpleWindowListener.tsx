import React, { Component } from 'react';
import { Detachable } from './Detachable';

export const URL_PATH = '/simple-window-listener';

export type SimpleWindowListenerProps = {};
export type SimpleWindowListenerState = {};

export class SimpleWindowListener extends Component<SimpleWindowListenerProps, SimpleWindowListenerState> {
  constructor(props: SimpleWindowListenerProps) {
    super(props);
    window.document.body.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.handleClick);
  }

  handleClick = () => {
    console.log('clicked');
  }

  render() {
    return (
      <div>
        Your component now has a dummy
        {' '}
        <strong><code>document.body.onclick</code></strong>
        {' '}
        listener.
      </div>
    )
  }
}

export const DetachableSimpleWindowListener = () => (
  <Detachable>
    <SimpleWindowListener />
  </Detachable>
);

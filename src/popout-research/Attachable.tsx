import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

export type AttachableProps = {
  onAttachClick?: () => void;
};

export type AttachableState = {};

export class Attachable extends Component<AttachableProps, AttachableState> {
  componentDidMount() {
    console.log('componentDidMount');
    console.log(document.getElementById('attach'));
    ReactDOM.render(
      (
        <button onClick={this.props.onAttachClick}>
          Attach
        </button>
      ),
      document.getElementById('attach')
    );
  }

  render() {
    return (
      <Fragment />
    );
  }
}

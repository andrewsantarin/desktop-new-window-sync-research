import React, { Component } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { RootState } from './Root.reducer';

import { updateValue } from './Value.state';
import { valueBroadcastChannel as channel, ValueMessage } from './Value.sync';
import { Detachable } from './Detachable';
import { ValueFetchContainer } from './ValueFetch';
import { DropdownMenu } from './DropdownMenu';
import { Button } from 'antd';

export const URL_PATH = '/value';

// Components
export type ValueStateProps = {
  value: number;
};

export type ValueDispatchProps = {
  updateValue(value: number): void;
};

export type ValueOwnProps = {

};

export type ValueState = {
  value: number;
};

export type ValueProps = ValueStateProps & ValueDispatchProps & ValueOwnProps;

export class Value extends Component<ValueProps, ValueState> {
  constructor(props: ValueProps) {
    super(props);

    this.state = {
      value: 0,
    };

    channel.addEventListener('message', (message) => {
      this.setState(message);
    });
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register(`./stateServiceWorker.js`)
    //     .then(() => navigator.serviceWorker.ready)
    //     .then(() => {
    //       navigator.serviceWorker.addEventListener('message', (event) => {
    //         if (event.data && event.data.state != null) {
    //           this.setState({
    //             value: event.data.value,
    //           });
    //         }
    //       });
    //     });
    // }
  }
  
  componentDidMount() {
    // console.log('cdm', this.props.value);
  }

  sendStateToServiceWorker(data: ValueState) {
    // if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    //   navigator.serviceWorker.controller.postMessage(data);
    // }
  }

  broadcastState = (data: ValueMessage) => {
    channel.postMessage(data);
  }

  incrementValue = (value: number) => value + 1;
  decrementValue = (value: number) => value - 1;

  handleReactIncrementValueClick = () => {
    const newValue = this.incrementValue(this.state.value);
    const newState = {
      value: newValue,
    };
    this.broadcastState(newState);
    this.setState(newState);
  }

  handleReactDecrementValueClick = () => {
    const newValue = this.decrementValue(this.state.value);
    const newState = {
      value: newValue,
    };
    this.broadcastState(newState);
    this.setState(newState);
  }

  handleReduxIncrementValueClick = () => {
    const newValue = this.incrementValue(this.props.value);
    this.props.updateValue(newValue);
  }

  handleReduxDecrementValueClick = () => {
    const newValue = this.decrementValue(this.props.value);
    this.props.updateValue(newValue);
  }

  render() {
    return (
      <div style={{ margin: 8 }}>
        <div><label><code>react state:</code></label> {this.state.value}</div>
        <div>
          <button onClick={this.handleReactIncrementValueClick}>+</button>
          <button onClick={this.handleReactDecrementValueClick}>-</button>
        </div>
        <div><label><code>redux state:</code></label> {this.props.value}</div>
        <div>
          <button onClick={this.handleReduxIncrementValueClick}>+</button>
          <button onClick={this.handleReduxDecrementValueClick}>-</button>
        </div>
        <DropdownMenu
          menuTemplate={{
            childrenTemplate: [
              {
                content: 'Item 1',
                icon: 'user',
                iconPosition: 'left',
              },
              {
                content: 'Item 2',
                icon: 'user',
                iconPosition: 'left',
              },
              {
                content: 'Item 3',
                icon: 'user',
                iconPosition: 'left',
              },
              {
                submenu: 'submenu',
                content: 'Submenu 4',
                icon: 'user',
                iconPosition: 'left',
                childrenTemplate: [
                  {
                    content: 'Item 4.1',
                    icon: 'user',
                    iconPosition: 'left',
                  },
                ]
              }
            ]
          }}
          icon="user"
          content="This menu should work."
          contentWrapper={Button}
        />
        <ValueFetchContainer />
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<ValueStateProps, ValueOwnProps, RootState> = (state) => ({
  value: state.value.value,
});

const mapDispatchToProps: MapDispatchToProps<ValueDispatchProps, ValueOwnProps> = {
  updateValue,
};

export const ValueContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Value);

export const DetachableValueContainer = () => (
  <Detachable>
    <ValueContainer />
  </Detachable>
);

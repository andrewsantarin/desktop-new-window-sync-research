import BroadcastChannel from 'broadcast-channel';
import { oc } from 'ts-optchain.macro';

import { BlacklistStateTransformer } from './redux-state-sync-blacklist';
import { ValueState } from './Value.state';

export type ValueMessage = {
  value: number;
};

export const valueBroadcastChannel = new BroadcastChannel<ValueMessage>('value-sync');

export const blacklistApiFromSync: BlacklistStateTransformer<Partial<ValueState>> = (state) => {
  if (!state) {
    return;
  }

  const api = oc(state).api();
  if (!api) {
    return state;
  }

  // Discard the API instance here so that there's only one instance of it... in the main window.
  const {
    api: _api,
    ...rest
  } = state!;

  return rest;
};

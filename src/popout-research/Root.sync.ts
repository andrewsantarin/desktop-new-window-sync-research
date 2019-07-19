import { REHYDRATE } from 'redux-persist';
import { Config as StateSyncConfig } from 'redux-state-sync';
import { BlacklistStateTransformers } from './redux-state-sync-blacklist';
import { RootState } from './Root.reducer';
import { blacklistApiFromSync } from './Value.sync';

export const rootBlacklistStateTransfomers: BlacklistStateTransformers<RootState> = {
  value: blacklistApiFromSync,
};

export const stateSyncConfig: StateSyncConfig = {
  channel: 'value',
  whitelist: [
    REHYDRATE
  ],
};

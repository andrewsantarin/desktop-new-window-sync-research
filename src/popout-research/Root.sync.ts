import { BlacklistStateTransformers } from './redux-state-sync-blacklist';
import { RootState } from './Root.reducer';
import { blacklistApiFromSync } from './Value.sync';

export const rootBlacklistStateTransfomers: BlacklistStateTransformers<RootState> = {
  value: blacklistApiFromSync,
};

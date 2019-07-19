import { RootState } from './Root.reducer';
import { valueTransform } from './Value.persistence';

export const persistWhitelist: (keyof RootState)[] = [
  'value',
];

export const persistBlacklist: (keyof RootState)[] = [
];

export const persistTransforms = [
  valueTransform,
];

// Shamelessly copied from the `react-use` library.
import { EffectCallback, useEffect } from 'react';

export const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export const useMount = (fn: VoidFunction) => {
  useEffectOnce(() => {
    fn();
  });
};

import { Action, AnyAction, Dispatch, Middleware } from 'redux';

type AnyState = {
  [key: string]: any;
};

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

const RECEIVE_INITIAL_STATE = '&_RECEIVE_INIT_STATE';
export type ReceiveInitialStateAction<State extends AnyState> = Action<typeof RECEIVE_INITIAL_STATE> & {
  payload: Partial<State>;
};

export type BlacklistStateTransformer<State extends AnyState> = (state?: State) => State | undefined;
export type BlacklistStateTransformers<State extends AnyState> = PartialRecord<keyof State, any>;

export const blacklistInitialState = <State extends AnyState>(
  action: AnyAction | ReceiveInitialStateAction<State>,
  blacklistsStateTransformers?: BlacklistStateTransformers<Partial<State>>
): AnyAction => {
  if (action.type !== RECEIVE_INITIAL_STATE) return action;
  if (blacklistsStateTransformers == null) return action;

  const oldAction = Object.assign({}, action as ReceiveInitialStateAction<State>);

  const newState = Object.keys(oldAction.payload).reduce((newState, key) => {
    const { [key]: blacklistStateTransformer } = blacklistsStateTransformers;

    if (!blacklistStateTransformer) {
      // @ts-ignore
      newState[key] = oldAction.payload[key];
      return newState;
    }

    // @ts-ignore
    newState[key] = blacklistStateTransformer(oldAction.payload[key]);
    return newState;
  }, {} as Partial<State>);

  const newAction: ReceiveInitialStateAction<State> = {
    type: oldAction.type,
    payload: newState,
  };

  return newAction;
};

export const createStateSyncBlacklistMiddleware = <State>(
  blacklistsStateTransformers?: BlacklistStateTransformers<Partial<State>>
): Middleware<{}, any, Dispatch<AnyAction>> => () => {
  return (next: Dispatch<AnyAction>) => (action: any) => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(blacklistInitialState(action, blacklistsStateTransformers));

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  }
}

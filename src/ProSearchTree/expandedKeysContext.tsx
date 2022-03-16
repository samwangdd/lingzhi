import * as React from 'react';

type Action =
  | { type: 'clear' }
  | { type: 'addKeys'; payload: string[] }
  | { type: 'updateKeys'; payload: string[] };
type Dispatch = (action: Action) => void;
type State = { keys: string[] };
type CountProviderProps = { children: React.ReactNode };

const CountContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
);

function countReducers(state: State, action: Action) {
  switch (action.type) {
    case 'addKeys':
      return { keys: [...state.keys, ...action.payload] };
    case 'updateKeys':
      return { keys: action.payload };
    case 'clear':
      return { keys: [] };
    default:
      throw new Error(`Unhandled action type of CountProvider`);
  }
}

function CountProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducers, { keys: [] });
  const value = { state, dispatch };
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}

function useCount() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { CountProvider, useCount };

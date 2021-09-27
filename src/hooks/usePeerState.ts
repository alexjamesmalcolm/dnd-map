import { useCallback, useMemo } from "react";
import { usePeerState as usePeerStateReactPeer } from "react-peer";
import { DataConnection } from "peerjs";

interface Options {
  brokerId?: string;
}

const usePeerState = <State>(
  initialState: State,
  options?: Options
): {
  state: State;
  setState: (state: State) => void;
  brokerId: string;
  connections: DataConnection[];
  error: any;
} => {
  const internalOptions = useMemo<{ brokerId: string } | undefined>(() => {
    if (options?.brokerId) {
      return { brokerId: options.brokerId };
    }
    return undefined;
  }, [options?.brokerId]);
  const [state, setStateInternal, brokerId, connections, error] =
    usePeerStateReactPeer(initialState, internalOptions);
  const setState = useCallback(
    (state: State): void => {
      setStateInternal(state);
    },
    [setStateInternal]
  );
  return useMemo(
    () => ({
      state,
      setState,
      brokerId,
      connections,
      error,
    }),
    [brokerId, connections, error, setState, state]
  );
};

export default usePeerState;

import { useMemo } from "react";
import { useReceivePeerState as useReceivePeerStateReactPeer } from "react-peer";

const useReceivePeerState = <State>(peerBrokerId?: string) => {
  const [state, isConnected, error] = useReceivePeerStateReactPeer<State>(
    peerBrokerId || ""
  );
  return useMemo(
    () => ({ state, isConnected, error }),
    [error, isConnected, state]
  );
};

export default useReceivePeerState;

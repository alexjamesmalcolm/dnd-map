import { useParams } from "react-router";
import useReceivePeerState from "hooks/useReceivePeerState";
import { PeerState } from "PeerState";

const Guest = () => {
  const { brokerId } = useParams<{ brokerId: string }>();
  const {
    state,
    isConnected,
    error: errorOfSomeoneElse,
  } = useReceivePeerState<PeerState>(brokerId);
  return (
    <div>
      <pre>
        {JSON.stringify({ state, isConnected, errorOfSomeoneElse }, null, 2)}
      </pre>
      <label>
        Broker ID
        <output>{brokerId}</output>
      </label>
      <label>
        State
        <output>{state?.value}</output>
      </label>
    </div>
  );
};

export default Guest;

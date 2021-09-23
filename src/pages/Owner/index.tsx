import usePeerState from "hooks/usePeerState";
import { PeerState } from "PeerState";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const initialState = { value: "" };

const Owner = () => {
  const { state, setState, brokerId, error, connections } =
    usePeerState<PeerState>(initialState);
  console.log(connections);
  const handleStateChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const newState: PeerState = { value: event.target.value };
      setState(newState);
    },
    [setState]
  );
  return (
    <div>
      <pre>{JSON.stringify({ state, brokerId, error }, null, 2)}</pre>
      <Link to={brokerId} target="_blank">
        Share this Link
      </Link>
      <label>
        State
        <input onChange={handleStateChange} />
      </label>
    </div>
  );
};

export default Owner;

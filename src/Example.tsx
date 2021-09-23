import { useCallback, useMemo } from "react";
import usePeerState from "./hooks/usePeerState";
import useReceivePeerState from "./hooks/useReceivePeerState";
import { Link, useLocation } from "react-router-dom";

interface State {
  value: string;
}
const initialState: State = {
  value: "",
};

const queryParameterOfBrokerId = "broker_id";

const Example = () => {
  const location = useLocation();
  const brokerIdOfSomeoneElse = useMemo<string>(
    () =>
      new URLSearchParams(location.search).get(queryParameterOfBrokerId) || "",
    [location.search]
  );
  const { state, setState, brokerId, error, connections } =
    usePeerState(initialState);
  console.log(connections);
  const {
    state: stateOfSomeoneElse,
    isConnected,
    error: errorOfSomeoneElse,
  } = useReceivePeerState<State>(brokerIdOfSomeoneElse);
  const handleStateChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const newState: State = { value: event.target.value };
      setState(newState);
    },
    [setState]
  );
  return (
    <div>
      <pre>{JSON.stringify({ state, brokerId, error }, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          { stateOfSomeoneElse, isConnected, errorOfSomeoneElse },
          null,
          2
        )}
      </pre>
      <Link
        to={`${location.pathname}?${queryParameterOfBrokerId}=${brokerId}`}
        target="_blank"
      >
        Share this Link
      </Link>
      <label>
        Broker ID
        <output>{brokerIdOfSomeoneElse}</output>
      </label>
      <label>
        State
        <input onChange={handleStateChange} />
      </label>
    </div>
  );
};

export default Example;

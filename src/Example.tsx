import { useCallback, useState } from "react";
import usePeerState from "./hooks/usePeerState";
import useReceivePeerState from "./hooks/useReceivePeerState";

interface State {
  value: string;
}
const initialState: State = {
  value: "",
};

const Example = () => {
  const [brokerIdOfSomeoneElse, setBrokerIdOfSomeoneElse] = useState<string>();
  const { state, setState, brokerId, error, connections } =
    usePeerState(initialState);
  console.log(connections);
  const {
    state: stateOfSomeoneElse,
    isConnected,
    error: errorOfSomeoneElse,
  } = useReceivePeerState<State>(brokerIdOfSomeoneElse);
  const handleBrokerIdChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setBrokerIdOfSomeoneElse(event.target.value);
  }, []);
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
      <label>
        Broker ID
        <input onChange={handleBrokerIdChange} />
      </label>
      <label>
        State
        <input onChange={handleStateChange} />
      </label>
    </div>
  );
};

export default Example;

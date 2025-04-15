import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello World {count}</h1>

      <button onClick={() => setCount(count + 1)}>Click here</button>
    </>
  );
}

export default App;

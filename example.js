import React from 'react';
import { render } from 'react-dom';
import useCountdownSeconds from './';

function App() {
  return <div>Behold, le app</div>;
}

function Session({ children }) {
  const {
    start,
    startTime,
    timeLeft,
    isWarning
  } = useCountdownSeconds(3, 2);

  if (!startTime) {
    return (
      <div>
        <button onClick={() => start(new Date())}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => start(0)}>
        Logout
      </button>
      {isWarning && (
        <button onClick={() => start(new Date())}>Extend Session</button>
      )}
      <div>Logged in since: {startTime.toLocaleString()}</div>
      <div>Expires in {timeLeft} seconds</div>
      {children}
    </div>
  );

}

render(<Session><App /></Session>, window.root);

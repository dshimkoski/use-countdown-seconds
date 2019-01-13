# `@rehooks/use-countdown-seconds`

> React hook for use-countdown-seconds.

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.7 final.
>
> You'll need to install `react`, `react-dom`, etc at `^16.7.0-alpha.0`

## Install

```sh
yarn add @rehooks/use-countdown-seconds
```

## Usage

```js
import useCountdownSeconds from '@rehooks/use-countdown-seconds'

function Component() {
  const {
    start,
    startTime,
    timeLeft,
    isWarning
  } = useCountdownSeconds(3, 2)

  if (!startTime) {
    return (
      <div>
        not started
        <button onClick={() => start(new Date())} />
      ])
    )
  }

  return (
    <div>
      started ({timeLeft})
      {isWarning && <em>expiring soon</em>}
    </div>
  )
}
```

'use strict';
const test = require('ava');
const React = require('react');
const { createElement: h, useEffect } = React;
const ReactTestRenderer = require('react-test-renderer');
const lolex = require('lolex');

React.useEffect = React.useLayoutEffect;
const useCountdownSeconds = require('./');
React.useEffect = useEffect;

function render(val) {
  return ReactTestRenderer.create(val);
}

test(t => {
  function Component() {
    const {
      start,
      startTime,
      timeLeft,
      isWarning
    } = useCountdownSeconds(3, 2);

    if (!startTime) {
      return h('div', null, [
        '!started',
        h('button', { key: 1, onClick: () => start(new Date()) })
      ]);
    }

    return h('div', null, [
      'started',
      isWarning ? 'w' : '!w',
      timeLeft
    ]);
  }

  const clock = lolex.install();

  const tree = render(h(Component));
  const { root } = tree

  const div = root.find(el => el.type == 'div');
  t.is(div.props.children[0], '!started');

  div.props.children[1].props.onClick();
  t.is(div.props.children[0], 'started');
  t.is(div.props.children[1], '!w');
  t.is(div.props.children[2], 3);

  clock.tick(1000);
  t.is(div.props.children[0], 'started');
  t.is(div.props.children[1], 'w');
  t.is(div.props.children[2], 2);

  clock.tick(1000);
  t.is(div.props.children[0], 'started');
  t.is(div.props.children[1], 'w');
  t.is(div.props.children[2], 1);

  clock.tick(1000);
  t.is(div.props.children[0], '!started');
  t.is(div.props.children[1].type, 'button');
  t.is(div.props.children[2], undefined);

  clock.uninstall();
});

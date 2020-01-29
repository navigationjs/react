import React, { Component } from 'react';
import navigation, { toId } from '@navigationjs/core';

export default class Wrap extends Component {
  onValue = () => {
    const eventNames = [
      'transitionend',
      'webkitTransitionEnd',
      'oTransitionEnd',
      'otransitionend',
      'MSTransitionEnd',
    ];
    const callback = () => {
      eventNames.forEach(eventName =>
        this.element.removeEventListener(eventName, callback, false)
      );
    };
    eventNames.forEach(eventName => {
      this.element.addEventListener(eventName, callback, false);
    });
    this.forceUpdate();
  };

  componentDidMount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    scene.active.on('value', this.onValue);
    scene.depth.on('value', this.onValue);
  }

  componentWillUnmount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    scene.active.off('value', this.onValue);
    scene.depth.off('value', this.onValue);
  }

  render() {
    const { navigator: navigatorName, scene: sceneName, children } = this.props;

    const id = toId(navigatorName, sceneName);
    const pass = { id };

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    return (
      <div
        ref={ref => {
          this.element = ref;
        }}
        style={{
          transform: `translateX(${(1 - scene.active.value) *
            100}%) translateX(${-(scene.depth.value / 5) * 100}%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
      >
        {typeof children === 'function' ? children(pass) : children}
      </div>
    );
  }
}

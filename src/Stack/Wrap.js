import React, { Component } from 'react';
import navigation, { toId } from '@navigationjs/core';

export default class Wrap extends Component {
  constructor(props) {
    super(props);

    const { navigator: navigatorName, scene: sceneName } = props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    this.state = { loading: scene.active.value < 1 };
  }

  onValue = ({ name, value }) => {
    const eventNames = [
      'transitionend',
      'webkitTransitionEnd',
      'oTransitionEnd',
      'otransitionend',
      'MSTransitionEnd',
    ];
    const callback = () => {
      if (name === 'active') this.changeLoadingOnValue(value);
      eventNames.forEach(eventName =>
        this.element.removeEventListener(eventName, callback, false)
      );
    };
    eventNames.forEach(eventName => {
      this.element.addEventListener(eventName, callback, false);
    });
    this.forceUpdate();
  };

  changeLoadingOnValue = value => {
    if (value === 1) this.setState({ loading: false });
    else if (value === 0) this.setState({ loading: true });
  };

  changeLoadingOnWillValue = ({ name }) => {
    const { navigator: navigatorName, scene: sceneName } = this.props;
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    if (scene[name].value === 1) this.setState({ loading: false });
    else if (scene[name].value === 0) this.setState({ loading: true });
  };

  componentDidMount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    scene.active.on('will_value', this.changeLoadingOnValue);
    scene.active.on('value', this.onValue);
    scene.depth.on('value', this.onValue);
  }

  componentWillUnmount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    scene.active.off('will_value', this.changeLoadingOnValue);
    scene.active.off('value', this.onValue);
    scene.depth.off('value', this.onValue);
  }

  render() {
    const {
      navigator: navigatorName,
      scene: sceneName,
      children,
      style = {},
    } = this.props;
    const { loading } = this.state;

    const id = toId(navigatorName, sceneName);
    const pass = { loading, id };

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
          transitionDuration: `${scene.active.duration}ms`,
          overflow: 'hidden',
          backgroundColor: 'white',
          ...style,
        }}
      >
        {typeof children === 'function' ? children(pass) : children}
      </div>
    );
  }
}

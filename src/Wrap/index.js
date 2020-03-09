import React, { Component } from 'react';
import navigation from '@navigationjs/core';

let done = false;
export default class Wrap extends Component {
  componentDidMount() {
    if (done) return;
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
      const id = navigation.id();
      if (id) navigation.emit(`browser_back:${id}`);
      history.pushState(null, null, location.href);
    };
    done = true;
  }

  render() {
    const { children, style = {} } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
}

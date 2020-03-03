import { Value as BaseValue } from '@navigationjs/core';

const defaultDuration = 300;

export const EVENTS = {
  WILL_VALUE: 'will_value',
  VALUE: 'value',
};

let id = 0;

export default class Value extends BaseValue {
  /**
   * @param {string} name
   * @param {number} value
   * @param {number} duration
   */
  constructor(name, value, duration) {
    super(name, value, duration);
    this.__id = ++id;
    this.name = name;
    this.value = value;
    this.duration = duration;
  }

  /**
   * @param {number} value
   * @param {number} duration
   */
  to = (value, duration = defaultDuration) => {
    const fixedDuration = duration === 0 ? 0.1 : duration;
    const params = {
      __id: this.__id,
      name: this.name,
      value,
      duration: fixedDuration,
    };

    this.emit(EVENTS.WILL_VALUE, params);
    return new Promise(resolve => {
      this.value = value;
      this.emit(EVENTS.VALUE, params);

      setTimeout(() => {
        resolve();
      }, duration);
    });
  };
}

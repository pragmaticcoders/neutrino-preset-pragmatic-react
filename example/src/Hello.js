import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import style from './Hello.scss';
import logo from './logo.png';


const propTypes = PropTypes && {
  name: PropTypes.string
};
const defaultProps = {
};


class Hello extends PureComponent {
  render() {
    const { name } = this.props;
    return (
      <div className={style.Hello}>
        <h1 className={style.Hello}>Hello {name}!</h1>
        <img alt="logo" src={logo} height="150"/>
      </div>
    );
  }
}

Hello.displayName = 'Hello';
Hello.propTypes = propTypes;
Hello.defaultProps = defaultProps;
export default Hello;

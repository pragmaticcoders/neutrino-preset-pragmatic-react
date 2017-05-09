import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import style from './Hello.scss';


const propTypes = {
  name: PropTypes.string
};
const defaultProps = {
};


class Hello extends PureComponent {

  render() {
    const { name } = this.props;
    return (
      <h1 className={style.Hello}>Hello {name}!</h1>
    );
  }
}

Hello.displayName = 'Hello';
Hello.propTypes = propTypes;
Hello.defaultProps = defaultProps;
export default Hello;

import React from 'react';
import Hello from './Hello';


describe('(Component) Hello', () => {
  it('should render', () => {
    const wrapper = shallow(<Hello name="World"/>);
    expect(wrapper).toMatchSnapshot();
  });
});

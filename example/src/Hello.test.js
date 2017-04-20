import React from 'react';
import Hello from './Hello';


describe('(Component) Hello', function() {

  it('should render', function() {
    const wrapper = shallow(
      <Hello name="World"/>
    );
    expect(wrapper).toMatchSnapshot();

  });

});

// Make async/awiat awialable in tests
require("babel-polyfill");
// Make Enzyme functions available in all test files without importing
const enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-15');


const { shallow, render, mount, configure } = enzyme;

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

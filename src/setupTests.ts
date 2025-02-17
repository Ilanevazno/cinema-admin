/* eslint-disable */
import '@testing-library/jest-dom';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

global.IS_REACT_ACT_ENVIRONMENT = true;

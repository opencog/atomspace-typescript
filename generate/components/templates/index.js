const component = require("./component");
const componentTypes = require("./component.types");
const componentStories = require("./component.stories");
const componentTests = require("./component.test");
const componentStyles = require("./component.styles");
const componentIntegrationTest = require("./component.integration.test");
const functions = require("./component.controller");
const functionsTest = require("./component.controller.test");

module.exports = [
  component,
  componentTypes,
  componentStories,
  componentTests,
  componentStyles,
  componentIntegrationTest,
  functions,
  functionsTest
];

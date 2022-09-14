module.exports = (componentName) => ({
  content: `// Generated with util/templates/functions.test.js
import ${componentName}Controller from "../${componentName}.controller";

describe("${componentName} Function Unit Test", () => {

  beforeEach(() => {
  });


  it("Brand new test for function should fail.", () => {
    let input = "arbitrary";
    let result = ${componentName}Controller.init();
    
    // This should fail because this test is not yet developed.
    expect(result).toEqual("updated");
  });

});
`,
  extension: `.test.tsx`,
  functionsTest: true
});

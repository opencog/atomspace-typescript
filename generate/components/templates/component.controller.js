module.exports = (componentName) => ({
  content: `// Generated with util/templates/functions.js
const ${componentName}Controller = {
  init: () => {
    
  }
}

export default ${componentName}Controller;
`,
  extension: `.ts`,
  functions: true
});

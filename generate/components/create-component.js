const fs = require("fs");
const templates = require("./templates");

let parentComponentName;
let componentName = process.argv[2];

if (!componentName) {
  console.error("Please supply a valid component name".red);
  process.exit(1);
}

console.log("Creating Component Templates with name: " + componentName);

const componentDirectory = `./src/components/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`.red);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);
fs.mkdirSync(componentDirectory+"/__tests__");
fs.mkdirSync(componentDirectory+"/__stories__");

const generatedTemplates = templates.map((template) => template(componentName));

generatedTemplates.forEach((template) => {
   if (template.integrationTest){
    fs.writeFileSync(
      `${componentDirectory}/__tests__/${componentName}.integration${template.extension}`,
      template.content
    );
  }else if (template.functions){
    fs.writeFileSync(
      `${componentDirectory}/${componentName}.controller${template.extension}`,
      template.content
    );
  }else if (template.functionsTest){
    fs.writeFileSync(
      `${componentDirectory}/__tests__/${componentName}.unit${template.extension}`,
      template.content
    );
  }else if (template.extension === ".test.tsx"){
    fs.writeFileSync(
      `${componentDirectory}/__tests__/${componentName}.component${template.extension}`,
      template.content
    );
  }else if (template.extension === ".stories.tsx"){
    fs.writeFileSync(
      `${componentDirectory}/__stories__/${componentName}${template.extension}`,
      template.content
    );
  }else if (template.extension === "styles.ts"){
    fs.writeFileSync(
      `${componentDirectory}/${template.extension}`,
      template.content
    );
  }else{
    fs.writeFileSync(
      `${componentDirectory}/${componentName}${template.extension}`,
      template.content
    );
  }
});

console.log(
  "Successfully created component under: " + componentDirectory.green
);

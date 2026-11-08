
const fs = require('node:fs');
const path = require('node:path');

const componentName = process.argv[2];

if (!componentName) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const kebabCase = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

const pascalCase = kebabCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

const componentDir = path.join(
    process.cwd(),
    'src',
    'components',
    kebabCase
);

if (fs.existsSync(componentDir)) {
    console.error(`Component ${pascalCase} already exists.`);
    process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const tsxTemplate = `import './${pascalCase}.css';

interface ${pascalCase}Props {}

export function ${pascalCase}({}: ${pascalCase}Props) {
  return (
    <div className="${kebabCase}">
      ${pascalCase} component
    </div>
  );
}
`;

const cssTemplate = `.${kebabCase} {
  
}
`;

fs.writeFileSync(
    path.join(componentDir, `${pascalCase}.tsx`),
    tsxTemplate
);

fs.writeFileSync(
    path.join(componentDir, `${pascalCase}.css`),
    cssTemplate
);

console.log(`Component ${pascalCase} created successfully!`);

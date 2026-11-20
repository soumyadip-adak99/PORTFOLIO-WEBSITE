const fi = require('react-icons/fi');
const fa = require('react-icons/fa');
const si = require('react-icons/si');
const fs = require('fs');

const strokeIcons = {
  FiGithub: fi.FiGithub,
  FiLinkedin: fi.FiLinkedin,
  FiInstagram: fi.FiInstagram,
  FiMail: fi.FiMail
};

const fillIcons = {
  FaJava: fa.FaJava,
  FaAws: fa.FaAws,
  SiSpringboot: si.SiSpringboot,
  SiReact: si.SiReact,
  SiJavascript: si.SiJavascript,
  SiTypescript: si.SiTypescript,
  SiPython: si.SiPython,
  SiPostgresql: si.SiPostgresql,
  SiMysql: si.SiMysql,
  SiMongodb: si.SiMongodb,
  SiDocker: si.SiDocker,
  SiGit: si.SiGit,
  SiRedis: si.SiRedis,
  SiNodedotjs: si.SiNodedotjs,
  SiExpress: si.SiExpress,
  SiTailwindcss: si.SiTailwindcss
};

let output = 'import { h, defineComponent } from "vue";\n\n';

for (const [name, fn] of Object.entries(strokeIcons)) {
  const tree = fn({}).props;
  const attr = tree.attr || {};
  const children = tree.children || [];
  
  output += `export const ${name} = defineComponent({\n`;
  output += `  name: "${name}",\n`;
  output += `  props: {\n`;
  output += `    size: { type: [Number, String], default: 16 },\n`;
  output += `    class: String,\n`;
  output += `    style: Object\n`;
  output += `  },\n`;
  output += `  setup(props) {\n`;
  output += `    return () => h("svg", {\n`;
  output += `      class: props.class,\n`;
  output += `      style: props.style,\n`;
  output += `      width: props.size,\n`;
  output += `      height: props.size,\n`;
  output += `      viewBox: ${JSON.stringify(attr.viewBox || "0 0 24 24")},\n`;
  output += `      fill: "none",\n`;
  output += `      stroke: "currentColor",\n`;
  output += `      strokeWidth: "2",\n`;
  output += `      strokeLinecap: "round",\n`;
  output += `      strokeLinejoin: "round"\n`;
  output += `    }, [\n`;
  for (const child of children) {
    output += `      h("${child.type}", ${JSON.stringify(child.props)}),\n`;
  }
  output += `    ]);\n`;
  output += `  }\n`;
  output += `});\n\n`;
}

for (const [name, fn] of Object.entries(fillIcons)) {
  const tree = fn({}).props;
  const attr = tree.attr || {};
  const children = tree.children || [];
  
  output += `export const ${name} = defineComponent({\n`;
  output += `  name: "${name}",\n`;
  output += `  props: {\n`;
  output += `    size: { type: [Number, String], default: 16 },\n`;
  output += `    class: String,\n`;
  output += `    style: Object\n`;
  output += `  },\n`;
  output += `  setup(props) {\n`;
  output += `    return () => h("svg", {\n`;
  output += `      class: props.class,\n`;
  output += `      style: props.style,\n`;
  output += `      width: props.size,\n`;
  output += `      height: props.size,\n`;
  output += `      viewBox: ${JSON.stringify(attr.viewBox || "0 0 24 24")},\n`;
  output += `      fill: "currentColor",\n`;
  output += `      stroke: "none"\n`;
  output += `    }, [\n`;
  for (const child of children) {
    output += `      h("${child.type}", ${JSON.stringify(child.props)}),\n`;
  }
  output += `    ]);\n`;
  output += `  }\n`;
  output += `});\n\n`;
}

fs.writeFileSync('src/components/Icons.ts', output, 'utf8');
console.log('Icons.ts successfully generated with proper fill and stroke currentColor!');

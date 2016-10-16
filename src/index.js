import pkg from "../package.json";

const css = "background-color:#222; color:#0F0; font-size:16px";

/* eslint-disable */
console.log("%c" + pkg.name, css);
console.log("%cv" + pkg.version, css);
/* eslint-enable */

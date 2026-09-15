// Декларация для PNG
declare module '*.png' {
  const value: string;
  export default value;
}

// Декларация для SVG
declare module '*.svg' {
  const value: string;
  export default value;
}

// Декларация для scss
// declare module '*.scss' {
//   const value: string;
//   export default value;
// }

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}
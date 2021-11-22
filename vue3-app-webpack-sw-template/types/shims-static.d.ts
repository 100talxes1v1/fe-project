
declare module '*.png' {
  const s: string;
  export default s;
}


declare module '*.json' {
  const s: { version: string; };
  export default s;
}

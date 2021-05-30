import { reactive } from 'vue';

export function main() {
  return reactive({ a: 'hello world' });
}

console.log(main());

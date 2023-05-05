import { num } from './num.js';

const greetNum = (name: string, num: Number) => {
  console.log(`Hi ${name.toUpperCase()}, your Number is ${num}`);
};

greetNum('Agoes', num);

import { Card } from '../types/cards';

// These two are just helpers, they curate spring data, values that are later being interpolated into css
export const to = (
  i: number,
): {
  x: number;
  y: number;
  scale: number;
  rot: number;
  delay: number;
} => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 21,
});
export const from = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _i: number,
): {
  x: number;
  rot: number;
  scale: number;
  y: number;
} => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r: any, s: any, card: any): string => {
  return `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s}) ${
    card.reversed ? 'rotate(180deg)' : ''
  }`;
};

const randomBoolean = () => {
  const a = new Uint8Array(1);
  crypto.getRandomValues(a);
  return a[0] > 127;
};

export const shuffle = (cards: any): Card[] =>
  cards
    .map((a: any) => ({ sort: Math.random(), value: a }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map((a: any) => a.value);

export const addReversedProperty = (cards: Card[]): Card[] =>
  cards.map((card: Card) => ({
    ...card,
    reversed: randomBoolean(),
  }));

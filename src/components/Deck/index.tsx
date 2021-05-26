import { animated, to as interpolate, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { Card } from '../../types/cards';
import { from, to, trans } from '../../utils';
import styles from './Deck.module.scss';

interface DeckProps {
  currentCard: number;
  setCurrentCard: (value: number) => void;
  shuffledCards: Card[];
  onReset: () => void;
}

const Deck: React.FC<DeckProps> = ({ currentCard, setCurrentCard, shuffledCards, onReset }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(shuffledCards.length, (index) => ({
    ...to(index),
    from: from(index),
  })); // Create a bunch of springs using the helpers above

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) {
      gone.add(index);
      // setGone([...gone, index]);
      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    }
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      if (isGone) {
        const goneCards = gone.size + 1;
        if (index >= 1) {
          setCurrentCard(shuffledCards.length - goneCards);
        }
      }
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
      const scale = active ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      };
    });
    if (!active && gone.size === shuffledCards.length) {
      setTimeout(() => {
        onReset();
        gone.clear();
        api.start((i) => to(i));
      }, 600);
    }
  });

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className={styles.deckContainer} style={{ width: '50%' }}>
      {props.map(({ x, y, rot, scale }, index) => {
        const card = shuffledCards[index];
        return (
          <animated.div className={styles.deck} key={index} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.img
              {...(currentCard === index && bind(index))}
              src={`images/tarot-cards/${card.image}`}
              style={{
                transform: interpolate([rot, scale, card], trans),
              }}
            />
          </animated.div>
        );
      })}
    </div>
  );
};

export default Deck;

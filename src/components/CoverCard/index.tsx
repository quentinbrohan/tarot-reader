import { animated, to as interpolate, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { COVER_CARD } from '../../data/tarotCards';
import { from, to, trans } from '../../utils';
import styles from '../Deck/Deck.module.scss';

interface CoverCardProps {
  setIsStartMode: (value: boolean) => void;
}

const CoverCard: React.FC<CoverCardProps> = ({ setIsStartMode }) => {
  const [props] = useSprings(COVER_CARD.length, (index) => ({
    ...to(index),
    from: from(index),
  }));

  const onClick = useDrag(() => setIsStartMode(false));

  return (
    <div className={styles.deckContainer} style={{ width: '50%' }}>
      {props.map(({ x, y, rot, scale }, index) => {
        const card = COVER_CARD[index];
        return (
          <animated.div className={styles.deck} key={index} style={{ x, y }}>
            <animated.img
              {...onClick(index)}
              src={`images/tarot-cards/${card.image}`}
              style={{
                transform: interpolate([rot, scale, card], trans),
                cursor: 'pointer',
              }}
            />
          </animated.div>
        );
      })}
    </div>
  );
};

export default CoverCard;

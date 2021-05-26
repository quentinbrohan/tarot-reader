import { animated, useSpring } from '@react-spring/web';
import { ReactComponent as HandIcon } from '../../assets/images/arcana/hand.svg';
import { REVEAL_TOP } from '../../constants';
import styles from '../Deck/Deck.module.scss';

const StartMode: React.FC = () => {
  const animationStyle = useSpring({
    ...REVEAL_TOP,
    reset: true,
  });

  return (
    <animated.div style={animationStyle}>
      <HandIcon className={styles.arcanaIcon} />
      <h2>Your fate awaits!</h2>
      <div>Click on the card to reveal the truth.</div>
    </animated.div>
  );
};

export default StartMode;

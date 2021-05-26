import { animated, useSpring } from '@react-spring/web';
import { ReactComponent as CupsIcon } from '../../assets/images/arcana/cups.svg';
import { ReactComponent as MajorIcon } from '../../assets/images/arcana/major.svg';
import { ReactComponent as PentaclesIcon } from '../../assets/images/arcana/pentacles.svg';
import { ReactComponent as SwordsIcon } from '../../assets/images/arcana/swords.svg';
import { ReactComponent as WandsIcon } from '../../assets/images/arcana/wands.svg';
import { REVEAL_LEFT } from '../../constants';
import { ArcanaCategory, Card } from '../../types/cards';
import styles from './CardDetails.module.scss';
import stylesDeck from '../Deck/Deck.module.scss';

interface CardDetailsProps {
  card: Card;
}

interface MajorArcanaIconProps {
  category: ArcanaCategory;
}

const MajorArcanaIcon: React.FC<MajorArcanaIconProps> = ({ category }) => {
  switch (category) {
    case 'major':
      return <MajorIcon className={stylesDeck.arcanaIcon} title="Major" />;
    case 'cups':
      return <CupsIcon className={stylesDeck.arcanaIcon} title="Cups" />;
    case 'pentacles':
      return <PentaclesIcon className={stylesDeck.arcanaIcon} title="Pentacles" />;
    case 'swords':
      return <SwordsIcon className={stylesDeck.arcanaIcon} title="Swords" />;
    case 'wands':
      return <WandsIcon className={stylesDeck.arcanaIcon} title="Wands" />;
    default:
      return null;
  }
};
const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  const animationStyle = useSpring({
    ...REVEAL_LEFT,
    reset: true,
  });

  return (
    <animated.div className={styles.cardDetails} style={animationStyle}>
      <div className={styles.arcanaContainer}>
        <MajorArcanaIcon category={card.category} />
      </div>
      <h3 className={styles.title}>{card.name}</h3>
      {card.reversed && (
        <p className={styles.reversed}>
          <b>Reversed: </b>
          {card.reversedKeywords}
        </p>
      )}
      <p className={styles.description}>
        <b>Divinatory Meanings: </b>
        {card.description}
      </p>
    </animated.div>
  );
};

export default CardDetails;

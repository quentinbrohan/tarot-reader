import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import { ReactComponent as Header } from '../../assets/images/tarot-header.svg';
import { REVEAL_TOP } from '../../constants';
import TAROT_CARDS from '../../data/tarotCards';
import { addReversedProperty, shuffle } from '../../utils';
import CardDetails from '../CardDetails';
import CoverCard from '../CoverCard';
import Deck from '../Deck';
import Footer from '../Footer';
import StartMode from '../StartMode';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [shuffledCards, setShuffledCards] = useState(addReversedProperty(shuffle(TAROT_CARDS)));
  const [currentCard, setCurrentCard] = useState(shuffledCards.length - 1);

  const [isStartMode, setIsStartMode] = useState(true);

  const onReset = () => {
    const newShuffledCards = addReversedProperty(shuffle(TAROT_CARDS));
    setIsStartMode(true);
    setShuffledCards(newShuffledCards);
    setCurrentCard(shuffledCards.length - 1);
  };

  const animationStyle = useSpring(REVEAL_TOP);

  return (
    <div className={styles.container}>
      <animated.header style={animationStyle}>
        <Header title="Tarot Reader" className={styles.header} />
      </animated.header>
      <div className={styles.main}>
        {isStartMode ? (
          <CoverCard setIsStartMode={setIsStartMode} />
        ) : (
          <Deck
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            shuffledCards={shuffledCards}
            onReset={onReset}
          />
        )}

        <div className={styles.detailsContainer}>
          {isStartMode ? <StartMode /> : <CardDetails card={shuffledCards[currentCard]} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

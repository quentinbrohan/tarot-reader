import { animated, useSpring } from '@react-spring/web';
import { REVEAL_BOTTOM } from '../../constants';
import styles from './Footer.module.scss';
import FOOTER_DATA from '../../data/footerData';

const Footer: React.FC = () => {
  const animationStyle = useSpring({
    ...REVEAL_BOTTOM,
  });
  return (
    <animated.footer className={styles.footer} style={animationStyle}>
      <ul>
        {FOOTER_DATA.map((item: { icon: React.ReactElement; link: string; name: string }) => (
          <li key={item.name}>
            {item.icon}
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </animated.footer>
  );
};

export default Footer;

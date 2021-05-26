import { ReactComponent as GitHubLogo } from '../assets/images/icons/github.svg';
import { ReactComponent as PaintBrushIcon } from '../assets/images/icons/paint-brush.svg';
import { ReactComponent as SpellBookIcon } from '../assets/images/icons/spell-book.svg';
import styles from '../components/Footer/Footer.module.scss';

export default [
  {
    icon: <GitHubLogo className={styles.footerIcon} />,
    link: 'https://github.com/quentinbrohan',
    name: 'quentinbrohan',
  },
  {
    icon: <PaintBrushIcon className={styles.footerIcon} />,
    link: 'http://www.winslowdumaine.com/tarot',
    name: 'Winslow Dumaine',
  },
  {
    icon: <SpellBookIcon className={styles.footerIcon} />,
    link: 'https://www.barnesandnoble.com/w/an-occult-guide-to-the-tarot-travis-mchenry/1123404538',
    name: 'An Occult Guide to the Tarot - Travis McHenry',
  },
];

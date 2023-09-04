import Image from 'next/image';
import styles from './page.module.css';
import { GameBoard } from '@/components';

export default function Home() {
  return (
    <main className={styles.main}>
      <GameBoard width={50} height={50} />
    </main>
  );
}

import { useRouter } from 'next/router';
import styles from './EndScreen.module.css';

export default function EndScreen() {
  const router = useRouter();

  const handleRestart = () => {
    router.push('/'); // Redirige al inicio del juego
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Felicidades, has terminado el juego!</h1>
      <p className={styles.message}>Gracias por jugar. Esperamos que lo hayas disfrutado.</p>
      <button onClick={handleRestart} className={styles.button}>
        Volver al inicio
      </button>
    </div>
  );
}

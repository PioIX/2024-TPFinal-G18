"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador";
import Score from '@/components/Score';

export default function MostradorLogica() {
    // Estados para el cliente 1
    const [showImage1, setShowImage1] = useState(false);
    const [slideIn1, setSlideIn1] = useState(false);
    const [slideOut1, setSlideOut1] = useState(false);
    const [showDialogue1, setShowDialogue1] = useState(false);
    const [timeLeft1, setTimeLeft1] = useState(25);
    const [hasReceivedFood1, setHasReceivedFood1] = useState(false); // Nuevo estado

    // Estados para el cliente 2
    const [showImage2, setShowImage2] = useState(false);
    const [slideIn2, setSlideIn2] = useState(false);
    const [slideOut2, setSlideOut2] = useState(false);
    const [showDialogue2, setShowDialogue2] = useState(false);
    const [timeLeft2, setTimeLeft2] = useState(30);
    const [hasReceivedFood2, setHasReceivedFood2] = useState(false); // Nuevo estado

    // Otros estados
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);

    const playImgRef = useRef(null);
    const soundRef = useRef(null);

    // Configuración del cliente 1
    useEffect(() => {
        const showImageTimer1 = setTimeout(() => {
            setShowImage1(true);
            setTimeout(() => setSlideIn1(true), 100);
        }, 1000);

        const dialogueTimer1 = setTimeout(() => setShowDialogue1(true), 2000);

        const countdownInterval1 = setInterval(() => {
            setTimeLeft1(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(countdownInterval1);
                return 0;
            });
        }, 1000);

        const hideImageTimer1 = setTimeout(() => {
            if (!hasReceivedFood1) {  // Solo se ejecuta si no ha recibido comida
                setSlideIn1(false);
                setSlideOut1(true);
                setShowDialogue1(false);
                const removeImageTimer1 = setTimeout(() => setShowImage1(false), 500);
                return () => clearTimeout(removeImageTimer1);
            }
        }, 26000);

        return () => {
            clearTimeout(showImageTimer1);
            clearTimeout(hideImageTimer1);
            clearTimeout(dialogueTimer1);
            clearInterval(countdownInterval1);
        };
    }, [hasReceivedFood1]);

    // Configuración del cliente 2
    useEffect(() => {
        const showImageTimer2 = setTimeout(() => {
            setShowImage2(true);
            setTimeout(() => setSlideIn2(true), 100);
        }, 30000);

        const dialogueTimer2 = setTimeout(() => setShowDialogue2(true), 31000);

        const countdownInterval2 = setInterval(() => {
            setTimeLeft2(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(countdownInterval2);
                return 0;
            });
        }, 1000);

        const hideImageTimer2 = setTimeout(() => {
            if (!hasReceivedFood2) {
                setSlideIn2(false);
                setSlideOut2(true);
                setShowDialogue2(false);
                const removeImageTimer2 = setTimeout(() => setShowImage2(false), 500);
                return () => clearTimeout(removeImageTimer2);
            }
        }, 61000);

        return () => {
            clearTimeout(showImageTimer2);
            clearTimeout(hideImageTimer2);
            clearTimeout(dialogueTimer2);
            clearInterval(countdownInterval2);
        };
    }, [hasReceivedFood2]);

    // Función para entregar el budín a un cliente
    const handleGiveFood = () => {
        if (showImage1 && !hasReceivedFood1) {
            setHasReceivedFood1(true);
            setSlideIn1(false);
            setSlideOut1(true);
            setShowDialogue1(false);
            setTimeout(() => setShowImage1(false), 500);
        } else if (showImage2 && !hasReceivedFood2) {
            setHasReceivedFood2(true);
            setSlideIn2(false);
            setSlideOut2(true);
            setShowDialogue2(false);
            setTimeout(() => setShowImage2(false), 500);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const handlePlayPause = () => {
            if (!soundRef.current) {
                soundRef.current = new Audio('/sound/Los Hijos del Sol - Carñito.mp3');
            }

            if (isPlaying) {
                soundRef.current.pause();
                setIsPlaying(false);
            } else {
                soundRef.current.play();
                setIsPlaying(true);
            }
        };

        const playImgElement = playImgRef.current;

        if (playImgElement) {
            playImgElement.addEventListener('click', handlePlayPause);
        }

        return () => {
            if (playImgElement) {
                playImgElement.removeEventListener('click', handlePlayPause);
            }
        };
    }, [isPlaying]);

    return (
        <div className={styles.imgSoldati}>

            <Score score={score} />

            {/* Cliente 1 */}
            {showImage1 && (
                <div className={styles.characterContainer}>
                    <img
                        src="/clientes/hombreSucio.png"
                        alt="Cliente 1"
                        className={`${styles.appearImage} ${slideIn1 ? styles.slideIn : ''} ${slideOut1 ? styles.slideOut : ''}`}
                    />
                    {showDialogue1 && (
                        <div className={styles.dialogueBox}>
                            <p>
                                "TENGO HAMBREEE, DAME UN BUDÍN DE CHOCOLATE"
                                <br />
                                <span className={styles.timerText}>Tiempo restante: {timeLeft1} segundos...</span>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Cliente 2 */}
            {showImage2 && (
                <div className={styles.characterContainer}>
                    <img
                        src="/clientes/hombreChorro.png"
                        alt="Cliente 2"
                        className={`${styles.appearImage} ${slideIn2 ? styles.slideIn : ''} ${slideOut2 ? styles.slideOut : ''} ${styles.largerImage}`}
                    />
                    {showDialogue2 && (
                        <div className={styles.dialogueBox}>
                            <p>
                                "¡Dame un budín, rápido!"
                                <br />
                                <span className={styles.timerText}>Tiempo restante: {timeLeft2} segundos...</span>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Imagen del Budín */}
            <img
                src="/objetos/budinLimonSoldati.png"
                alt="Budín de Limón"
                className={styles.budinImage}
                onClick={handleGiveFood} // Acción al hacer clic en el budín
            />

            {/* Radio */}
            <img
                ref={playImgRef}
                className={styles.imgRadio}
                src="/objetos/Radio Soldati.png"
                id="playImg"
                alt="Play Radio"
            />

            {/* Botón para abrir modal */}
            <button 
                className={styles.openModalButton} 
                onClick={toggleModal}
            >
                Recetas
            </button>

            {/* Modal con recetas */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.nonEditableText}>
                            {"Masa + Cacao + Chips de chocolate = Budín de chocolate\nMasa + Esencia de vainilla + limón = Budín de vainilla"
                                .split('\n')
                                .map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                        </div>
                        <button 
                            className={styles.closeModalButton} 
                            onClick={toggleModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

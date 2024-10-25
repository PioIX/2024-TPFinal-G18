"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador"; // Importa el componente desde la carpeta components
import Score from '@/components/Score';


export default function MostradorLogica() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
    const [showImage, setShowImage] = useState(false); // Estado de visibilidad de la imagen
    const [slideIn, setSlideIn] = useState(false); // Control de la animación de entrada
    const [slideOut, setSlideOut] = useState(false); // Control de la animación de salida
    const [showDialogue, setShowDialogue] = useState(false); // Controla la visibilidad del diálogo
    const [timeLeft, setTimeLeft] = useState(25); // Tiempo total de visibilidad de la imagen (ahora 25 segundos)
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si la música está sonando
    const [score, setScore] = useState(0);


    const playImgRef = useRef(null); // Referencia para la imagen de play
    const soundRef = useRef(null); // Referencia para el audio

    useEffect(() => {
        // Temporizador para mostrar la imagen y empezar a deslizarse hacia adentro
        const showImageTimer = setTimeout(() => {
            setShowImage(true);
            setTimeout(() => {
                setSlideIn(true);
            }, 100); // Retardo pequeño para que la imagen esté lista antes de la animación
        }, 1000);

        // Temporizador para mostrar el diálogo mientras la imagen está quieta
        const dialogueTimer = setTimeout(() => {
            setShowDialogue(true);
        }, 2000); // El diálogo aparece 2 segundos después de que la imagen entre

        // Temporizador regresivo que disminuye cada segundo basado en el tiempo total de visibilidad
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(countdownInterval);
                    return 0;
                }
            });
        }, 1000);

        // Temporizador para iniciar el deslizamiento hacia afuera
        const hideImageTimer = setTimeout(() => {
            setSlideIn(false); // Detiene el deslizamiento hacia adentro
            setSlideOut(true); // Inicia el deslizamiento hacia afuera
            setShowDialogue(false); // Oculta el diálogo cuando la imagen empieza a deslizarse para salir
            const removeImageTimer = setTimeout(() => {
                setShowImage(false);
            }, 500);

            return () => clearTimeout(removeImageTimer);
        }, 26000); // La imagen se queda visible durante 25 segundos (añadimos 1000ms por el retardo del diálogo)

        return () => {
            clearTimeout(showImageTimer);
            clearTimeout(hideImageTimer);
            clearTimeout(dialogueTimer);
            clearInterval(countdownInterval);
        };
    }, []);

    // Función para abrir/cerrar el modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const handlePlayPause = () => {
            if (!soundRef.current) {
                soundRef.current = new Audio('/sound/Los Hijos del Sol - Carñito.mp3');
            }

            if (isPlaying) {
                // Si la música está sonando, pausa
                soundRef.current.pause();
                setIsPlaying(false);
            } else {
                // Si la música no está sonando, comienza a reproducir
                soundRef.current.play();
                setIsPlaying(true);
            }
        };

        const playImgElement = playImgRef.current;

        if (playImgElement) {
            playImgElement.addEventListener('click', handlePlayPause);
        }

        // Limpia los listeners al desmontar el componente
        return () => {
            if (playImgElement) {
                playImgElement.removeEventListener('click', handlePlayPause);
            }
        };
    }, [isPlaying]);

    

    return (
        <div className={styles.imgSoldati}>


        <Score score={score} />

            {/* Imagen que aparece y desaparece */}
            {showImage && (
                <div className={styles.characterContainer}>
                    <img
                        src="/clientes/hombreSucio.png"
                        alt="Hombre Sucio"
                        className={`${styles.appearImage} ${slideIn ? styles.slideIn : ''} ${slideOut ? styles.slideOut : ''}`}
                    />
                    
                    {/* Cuadro de diálogo que aparece cuando la imagen está detenida */}
                    {showDialogue && (
                        <div className={styles.dialogueBox}>
                            <p>
                                "TENGO HAMBREEE, DAME UN BUDÍN DE CHOCOLATE"
                                <br />
                                <span className={styles.timerText}>Tiempo restante: {timeLeft} segundos...</span>
                            </p>
                        </div>
                    )}
                </div>
            )}

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

            {/* Modal flotante con el área de texto no editable */}
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

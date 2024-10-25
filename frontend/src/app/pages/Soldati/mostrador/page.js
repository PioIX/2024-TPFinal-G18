"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador"; // Importa el componente desde la carpeta components

export default function MostradorLogica() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
    const [showImage, setShowImage] = useState(false); // Estado de visibilidad de la imagen
    const [slideIn, setSlideIn] = useState(false); // Control de la animación de entrada
    const [slideOut, setSlideOut] = useState(false); // Control de la animación de salida
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si la música está sonando

    const playImgRef = useRef(null); // Referencia para la imagen de play
    const soundRef = useRef(null); // Referencia para el audio

    useEffect(() => {
        // Temporizador para mostrar y esconder la imagen
        const showImageTimer = setTimeout(() => {
            setShowImage(true);
            setSlideIn(true);
        }, 1000);

        const hideImageTimer = setTimeout(() => {
            setSlideIn(false);
            setSlideOut(true);
            const removeImageTimer = setTimeout(() => {
                setShowImage(false);
            }, 500);

            return () => clearTimeout(removeImageTimer);
        }, 5000);

        return () => {
            clearTimeout(showImageTimer);
            clearTimeout(hideImageTimer);
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
            {/* Componente del mostrador */}

            {/* Imagen que aparecerá y desaparecerá */}
            {showImage && (
                <img
                    src="/clientes/hombreSucio.png"
                    alt="Hombre Sucio"
                    className={`${styles.appearImage} ${slideIn ? styles.slideIn : ''} ${slideOut ? styles.slideOut : ''}`}
                />
            )}

            {/* Radio */}
            <img
                ref={playImgRef}
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

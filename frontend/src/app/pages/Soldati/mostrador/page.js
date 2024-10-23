"use client";

import { useState, useEffect } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador"; // Importa el componente desde la carpeta components

export default function mostradorLogica() {
    // Estado para controlar si el modal está abierto o cerrado
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Texto predefinido que no será editable
    const textoNoEditable = 
        "Masa + Cacao + Chips de chocolate = Budín de chocolate\nMasa + Esencia de vainilla + limón = Budín de vainilla";

    // Estado para controlar la visibilidad de la imagen
    const [showImage, setShowImage] = useState(false);
    const [slideIn, setSlideIn] = useState(false); // Estado para manejar el deslizamiento hacia adentro
    const [slideOut, setSlideOut] = useState(false); // Estado para manejar el deslizamiento hacia afuera

    // useEffect para manejar el temporizador de la imagen
    useEffect(() => {
        const showImageTimer = setTimeout(() => {
            setShowImage(true); // Muestra la imagen
            setSlideIn(true); // Inicia el deslizamiento hacia adentro
        }, 1000); // Tiempo de espera antes de mostrar la imagen (1 segundo)

        const hideImageTimer = setTimeout(() => {
            setSlideIn(false); // Detiene el deslizamiento hacia adentro
            setSlideOut(true); // Inicia el deslizamiento hacia afuera
            const removeImageTimer = setTimeout(() => {
                setShowImage(false); // Cambia el estado para ocultar la imagen después de que se deslice
            }, 500); // Tiempo que coincide con la duración de la animación de deslizamiento hacia afuera

            return () => clearTimeout(removeImageTimer); // Limpia el temporizador si el componente se desmonta
        }, 5000); // Tiempo total que la imagen estará visible (5 segundos)

        return () => {
            clearTimeout(showImageTimer);
            clearTimeout(hideImageTimer); // Limpia el temporizador si el componente se desmonta
        };
    }, []);

    // Función para abrir/cerrar el modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.imgSoldati}>
            {/* Aquí puedes agregar la lógica o el componente del mostrador */}
            <Mostrador />

            {/* Imagen que aparecerá y desaparecerá */}
            {showImage && (
                <img
                    src="/clientes/hombreSucio.png" // Ruta de la imagen en la carpeta public
                    alt="Hombre Sucio"
                    className={`${styles.appearImage} ${slideIn ? styles.slideIn : ''} ${slideOut ? styles.slideOut : ''}`} // Agrega las clases de deslizamiento según corresponda
                />
            )}

            {/* Botón en la esquina inferior izquierda */}
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
                        {/* Div para mostrar texto no editable */}
                        <div className={styles.nonEditableText}>
                            {textoNoEditable.split('\n').map((line, index) => (
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

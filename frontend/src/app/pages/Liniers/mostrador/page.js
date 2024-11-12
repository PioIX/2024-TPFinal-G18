"use client"

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorliniers.module.css";
import Score from '@/components/Score';
import Cliente from "@/components/Clientes";
import { useSocket } from "@/hooks/socket";


export default function MostradorLogica() {

    const [score, setScore] = useState(0); // Definimos el estado para el puntaje
    const [showRecipeModal, setShowRecipeModal] = useState(false); // Estado para el modal de recetas
    const [persianaAbierta, setPersianaAbierta] = useState(false);

    //Estados clientes
    const [showImage, setShowImage] = useState(false);
    const [slideIn, setSlideIn] = useState(false);
    const [slideOut, setSlideOut] = useState(false);
    const [showDialogue, setShowDialogue] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25);
    const [hasReceivedFood, setHasReceivedFood] = useState(false);
    const [farewellDialogue, setFarewellDialogue] = useState(false);
    
    //socket
    const { socket, isConnected } = useSocket();


    // Función para abrir/cerrar el modal de recetas
    const toggleRecipeModal = () => {
        setShowRecipeModal(!showRecipeModal);
    };

    // Modificación en togglePersiana para cerrar el diálogo al cerrar la cortina
    const togglePersiana = () => {
        setPersianaAbierta(!persianaAbierta);

        if (!persianaAbierta && showImage3) {
            setSlideIn(false);
            setSlideOut(true);
            setShowDialogue(false); // Oculta el diálogo cuando el policía se va
            setTimeout(() => setShowImage(false), 500); // Esconde la imagen después de la animación
        }
    };





    useEffect(() => {
        if (!socket)
            return;

        socket.on("budinMostrador", (data) => {
            let url = "/objetos/";
            if (data.budin == "vainilla") {
                setbudinURL(url + "budinLimonSoldati.png");
            } else
                setbudinURL(url + "budinChocolateSoldati.png");

        })
    }, [socket, isConnected])

    // Configuración del cliente 
    useEffect(() => {
        setTimeLeft(30); // Configura el contador a 30 segundos

        const showImageTimer = setTimeout(() => {
            setShowImage(true);
            setTimeout(() => setSlideIn(true), 100);
        }, 4000);

        const dialogueTimer = setTimeout(() => setShowDialogue(true), 5000);

        const countdownInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(countdownInterval);
                return 0;
            });
        }, 1000);

        const hideImageTimer = setTimeout(() => {
            if (!hasReceivedFood) {
                setSlideIn(false);
                setSlideOut(true);
                setShowDialogue(false); // Oculta el diálogo cuando el cliente se va automáticamente
                const removeImageTimer = setTimeout(() => setShowImage(false), 500);
                return () => clearTimeout(removeImageTimer);
            }
        }, 31000);

        return () => {
            clearTimeout(showImageTimer);
            clearTimeout(hideImageTimer);
            clearTimeout(dialogueTimer);
            clearInterval(countdownInterval);
        };
    }, [hasReceivedFood]);














    return (
        <div className={styles.imgLiniers}>
            <Score score={score} />
            {/* Botón de recetas */}
            <button onClick={toggleRecipeModal} className={styles.openModalButton}>
                Recetas
            </button>

            <Cliente
                src={imageSrc}
                alt="Cliente 1"
                dialogue={farewellDialogue ? "Gracia loco!" : "TENGO HAMBREEE, DAME UN BUDÍN DE CHOCOLATE!"}
                showImage={showImage}
                slideIn={slideIn}
                slideOut={slideOut}
                showDialogue={showDialogue || farewellDialogue}
                timeLeft={timeLeft}
                onClientClick={() => handleClientClick(1)}
            />

            {/* Modal de recetas */}
            {showRecipeModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button onClick={toggleRecipeModal} className={styles.closeModalButton}>
                            X
                        </button>
                        <h3>Recetas</h3>
                        <ul>
                            <li>Budín de Chocolate: Budín + horno + chocolate</li>
                            <li>Budín de Vainilla: Budín + horno + vainilla</li>
                        </ul>
                        <h3>ALERTA!</h3>
                        <ul>
                            <li>Cuando cae la gorra cerrá todo</li>
                            <li>Cuando cae la noche, cuidado con jonatan</li>
                        </ul>
                    </div>
                </div>
            )}


            <img
                src="/objetos/cajaRegistradoraSoldati.png"
                alt="Caja registradora"
                className={styles.imgCajaRegistradora}
            />

            <div>
                {/* Persiana */}
                <div className={`${styles.persiana} ${persianaAbierta ? styles.abierta : ""}`}></div>

                {/* Botón para abrir/cerrar persiana */}
                <button className={styles.persianaButton} onClick={togglePersiana}>
                    {persianaAbierta ? "Subir Persiana" : "Bajar Persiana"}
                </button>
            </div>
        </div>
    );
}



"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador";
import Score from '@/components/Score';
import Cliente from "@/components/Clientes";

export default function MostradorLogica() {
    const [score, setScore] = useState(0); // Definimos el estado para el puntaje

    // Estados para el cliente 1
    const [showImage1, setShowImage1] = useState(false);
    const [slideIn1, setSlideIn1] = useState(false);
    const [slideOut1, setSlideOut1] = useState(false);
    const [showDialogue1, setShowDialogue1] = useState(false);
    const [timeLeft1, setTimeLeft1] = useState(25);
    const [hasReceivedFood1, setHasReceivedFood1] = useState(false); 

    // Estados para el cliente 2
    const [showImage2, setShowImage2] = useState(false);
    const [slideIn2, setSlideIn2] = useState(false);
    const [slideOut2, setSlideOut2] = useState(false);
    const [showDialogue2, setShowDialogue2] = useState(false);
    const [timeLeft2, setTimeLeft2] = useState(30);
    const [hasReceivedFood2, setHasReceivedFood2] = useState(false); 

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
            if (!hasReceivedFood1) {  
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
                const removeImageTimer2 = setTimeout(() => {
                    setShowImage2(false);
                    setShowDialogue2(false); // Asegúrate de que el diálogo esté oculto
                }, 500);
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

    // Función para entregar el budín al cliente
    const handleGiveFood = () => {
        if (showImage1 && !hasReceivedFood1) {
            setHasReceivedFood1(true);
        } else if (showImage2 && !hasReceivedFood2) {
            setHasReceivedFood2(true);
        }
    };

    // Función para hacer clic en el cliente y que se vaya si ha recibido comida
    const handleClientClick = (clientNumber) => {
        if (clientNumber === 1 && hasReceivedFood1) {
            setScore(prevScore => prevScore + 50); // Incrementa el puntaje al cumplir la interacción
            setSlideIn1(false);
            setSlideOut1(true);
            setShowDialogue1(false); // Oculta el diálogo al irse el cliente
            setTimeout(() => {
                setShowImage1(false);
                setShowDialogue1(false); // Asegúrate de que el diálogo esté oculto
            }, 500);
        } else if (clientNumber === 2 && hasReceivedFood2) {
            setScore(prevScore => prevScore + 30);
            setSlideIn2(false);
            setSlideOut2(true);
            setShowDialogue2(false); // Oculta el diálogo al irse el cliente
            setTimeout(() => {
                setShowImage2(false);
                setShowDialogue2(false); // Asegúrate de que el diálogo esté oculto
            }, 500);
        }
    };
    

    return (
        <div className={styles.imgSoldati}>
            <Score score={score} />

            <Cliente
                src="/clientes/hombreSucio.png"
                alt="Cliente 1"
                dialogue="TENGO HAMBREEE, DAME UN BUDÍN DE CHOCOLATE"
                showImage={showImage1}
                slideIn={slideIn1}
                slideOut={slideOut1}
                showDialogue={showDialogue1}
                timeLeft={timeLeft1}
                onClientClick={() => handleClientClick(1)}
            />

            <Cliente
                src="/clientes/hombreChorro.png"
                alt="Cliente 2"
                dialogue="¡Dame un budín de limón, rápido!"
                showImage={showImage2}
                slideIn={slideIn2}
                slideOut={slideOut2}
                showDialogue={showDialogue2}
                timeLeft={timeLeft2}
                onClientClick={() => handleClientClick(2)}
            />

            <img
                src="/objetos/budinLimonSoldati.png"
                alt="Budín de Limón"
                className={styles.budinImageContainer}
                onClick={handleGiveFood}
            />

            <img
                src="/objetos/budinChocolateSoldati.png"
                alt="Budín de Chocolate"
                className={styles.budinImageChocolate}
                onClick={handleGiveFood}
            />
            {/* Radio */}
            <img
            ref={playImgRef}
            className={styles.imgRadio}
            src="/objetos/Radio Soldati.png"
            id="playImg"
            alt="Play Radio"
        />
  </div>
);
}

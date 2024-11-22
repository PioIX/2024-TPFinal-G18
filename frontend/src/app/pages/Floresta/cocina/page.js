"use client";

import { useEffect, useState } from "react";
import styles from "./cocinafloresta.module.css";
import { useSocket } from "@/hooks/socket";
import Score from '@/components/Score';
import { useRouter } from 'next/navigation';



export default function cocinaLogica() {
    const [budinPosition, setBudinPosition] = useState({ top: 372, left: 650 });
    const [isPlaced, setIsPlaced] = useState(false);
    const [isCooked, setIsCooked] = useState(false);
    const [isVainillaSelected, setIsVainillaSelected] = useState(false);
    const [isChocolateSelected, setIsChocolateSelected] = useState(false);
    const [budinType, setBudinType] = useState(null); // "vainilla" o "chocolate"
    const [isBudinFinalSelected, setIsBudinFinalSelected] = useState(false); // Estado para mostrar la flecha
    const [score, setScore] = useState (0);
    const [contadorBudines, setContadorBudines] = useState(0);
    const [mensajeDiaTerminado, setMensajeDiaTerminado] = useState(false);
    const {socket, isConnected} = useSocket();
    const router = useRouter();


    useEffect(() => {
        if (!socket) 
            return;

        //Todo lo que reciba el socket se hace acá
    }, [socket,isConnected]);

    useEffect(() => {
        if (contadorBudines >= 10) {
            setMensajeDiaTerminado(true);
            // Espera 8 segundos 
            setTimeout(() => {
                router.push('/pages/Palermo/cocina');
            }, 8000);
            // Redirige cuando el score llega exactamente a 1500
        }
    }, [contadorBudines]);

    const handleBudinClick = () => {
        if (!isPlaced) {
            setIsPlaced(true);
        }
    };

    const handleVainillaClick = () => {
        if (!budinType) setIsVainillaSelected(true);
    };

    const handleChocolateClick = () => {
        if (!budinType) setIsChocolateSelected(true);
    };

    const handleContainerClick = (e) => {
        if (isCooked || !isPlaced) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const newTop = rect.bottom - 332;
        const newLeft = rect.right - 410;

        setBudinPosition({ top: newTop, left: newLeft });
        setIsPlaced(true);

        setTimeout(() => {
            setIsCooked(true);
            setBudinPosition({ top: 382, left: 680 });
        }, 6000);
    };

    const handleBudinCocidoClick = () => {
        if (!isCooked || budinType) return;

        if (isVainillaSelected) {
            setBudinType("vainilla");
            setIsVainillaSelected(false);
            setIsBudinFinalSelected(true); // Muestra la flecha
        } else if (isChocolateSelected) {
            setBudinType("chocolate");
            setIsChocolateSelected(false);
            setIsBudinFinalSelected(true); // Muestra la flecha
        }
    };

    const handleArrowClick = () => {
        setIsBudinFinalSelected(false); // Oculta el budín cuando se hace clic en la flecha
        setIsCooked(false);
        socket.emit("budinCocina", {budin: budinType});
        setContadorBudines(contadorBudines + 1);
        setScore(score+100);
        setBudinType(null);
    };

    return (
        <div className={styles.imgSoldatiCocina} onClick={handleContainerClick}>
        <Score score={score} />

            {!isCooked && (
                <img
                    src="/objetos/budinSinCocinar.png"
                    alt="Budin sin cocinar"
                    className={styles.imgBudinSinCocinar}
                    style={{
                        top: `${budinPosition.top}px`,
                        left: `${budinPosition.left}px`,
                        position: "absolute",
                    }}
                    onClick={handleBudinClick}
                />
            )}

            {/* Mostrar mensaje "DÍA 1 TERMINADO" cuando corresponda */}
            {mensajeDiaTerminado && (
                <div className={styles.diaTerminado}>
                    <h2>¡DÍA 3 TERMINADO!</h2>
                </div>
            )}

            {isCooked && (
                <img
                    src={
                        budinType === "vainilla" 
                            ? "/objetos/budinVainilla.png"
                            : budinType === "chocolate"
                            ? "/objetos/budinChocolate.png"
                            : "/objetos/budinCocido.png"
                    }
                    alt="Budin cocido"
                    className={styles.imgBudinCocido}
                    style={{
                        top: `${budinPosition.top}px`,
                        left: `${budinPosition.left}px`,
                        position: "absolute",
                    }}
                    onClick={handleBudinCocidoClick}
                />
            )}

            <img
                src="/objetos/Vainilla.png"
                alt="Vainilla"
                className={styles.imgVainilla}
                onClick={handleVainillaClick}
            />

            <img
                src="/objetos/chocolate.png"
                alt="Chocolate"
                className={styles.imgChocolate}
                onClick={handleChocolateClick}
            />

            {/* Muestra la flecha solo cuando se selecciona el budín final */}
            {isBudinFinalSelected && (
                <img
                    src="/objetos/flecha.png"
                    alt="flecha"
                    className={styles.imgArrowLeft}
                    onClick={handleArrowClick}
                />
            )}

             {/*
            <img
                src="/objetos/cintaMecanica.png"
                alt="Cinta Mecanica"
                className={styles.imgCintaMecanica}
            /> */}

        </div>
    );
}

           

"use client";

import { useState } from "react";
import styles from "./cocinasoldati.module.css";

export default function cocinaLogica() {
    const [budinPosition, setBudinPosition] = useState({ top: 372, left: 650 });
    const [isPlaced, setIsPlaced] = useState(false);
    const [isCooked, setIsCooked] = useState(false);
    const [isVainillaSelected, setIsVainillaSelected] = useState(false);
    const [isChocolateSelected, setIsChocolateSelected] = useState(false);
    const [budinType, setBudinType] = useState(null); // "vainilla" o "chocolate"
    const [isBudinFinalSelected, setIsBudinFinalSelected] = useState(false); // Estado para mostrar la flecha

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
        const newTop = rect.bottom - 322;
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
        setBudinType(null);
    };

    return (
        <div className={styles.imgSoldatiCocina} onClick={handleContainerClick}>
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

            {isCooked && (
                <img
                    src={
                        budinType === "vainilla"
                            ? "/objetos/budinLimonSoldati.png"
                            : budinType === "chocolate"
                            ? "/objetos/budinChocolateSoldati.png"
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

           

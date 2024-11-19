"use client"

// Cliente.js
import React from 'react';
import clientStyles from './clientes.module.css';

export default function Cliente({
    src,
    alt,
    dialogue,
    showImage,
    slideIn,
    slideOut,
    showDialogue,
    timeLeft,
    onClientClick,
    esPolicia
}) {
    if (!showImage) return null;

    return (
        <div className={clientStyles.characterContainer} onClick={onClientClick}>
            <img
                src={src}
                alt={alt}
                className={`${clientStyles.appearImage} ${slideIn ? clientStyles.slideIn : ''} ${slideOut ? clientStyles.slideOut : ''}`}
            />
            {showDialogue && (
                <div className={clientStyles.dialogueBox}>
                    <p>
                        {dialogue}
                        <br />
                        <span className={clientStyles.timerText}>Tiempo restante: {timeLeft} segundos...</span>
                    </p>
                </div>
            )}
        </div>
    );
}

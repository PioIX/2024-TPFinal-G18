"use client"

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorliniers.module.css";
import Score from '@/components/Score';
import Cliente from "@/components/Clientes";

export default function MostradorLogica() {
    const [score, setScore] = useState(0); // Definimos el estado para el puntaje
    const [showRecipeModal, setShowRecipeModal] = useState(false); // Estado para el modal de recetas
    const [persianaAbierta, setPersianaAbierta] = useState(false);

    return (
        <div className={styles.imgLiniers}>
            <Score score={score} />
        </div>
        );
}
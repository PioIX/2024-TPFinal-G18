"use client"

import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador"; // Importa el componente desde la carpeta components

export default function mostradorLogica() {
    // Si necesitas alguna lógica o estado, puedes agregarla aquí.
    
    return (
        <div className={styles.imgSoldati}>
            <Mostrador />
        </div>
    );
}

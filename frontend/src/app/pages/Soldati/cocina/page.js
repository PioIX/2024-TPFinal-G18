"use client";

import styles from "./cocinasoldati.module.css"; // Importa los estilos correctamente
import Cocina from "@/components/Cocina"; // Importa el componente desde la carpeta components

export default function cocinaLogica() {
    // Si necesitas alguna lógica o estado, puedes agregarla aquí.
    
    return (
        <div className={styles.imgSoldatiCocina}>
            <Cocina />
        </div>
    );
}

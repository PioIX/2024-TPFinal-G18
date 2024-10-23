"use client";

import { useState } from "react";
import styles from "./mostradorsoldati.module.css";
import Mostrador from "@/components/Mostrador"; // Importa el componente desde la carpeta components

export default function mostradorLogica() {
    // Estado para controlar si el modal está abierto o cerrado
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Texto predefinido que no será editable
    const textoNoEditable = 
    "Masa + Cacao + Chips de chocolate = Budín de chocolate\nMasa + Esencia de vainilla + limón = Budín de vainilla";

    // Función para abrir/cerrar el modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.imgSoldati}>
            {/* Aquí puedes agregar la lógica o el componente del mostrador */}

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

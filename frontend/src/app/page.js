"use client"; // Asegúrate de que esto esté al inicio del archivo

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Form from "@/components/Form";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";
import Head from 'next/head';
import { Bowlby_One_SC } from "next/font/google";

// Importa la fuente de Google correctamente con el peso especificado
const bowlbyOneSC = Bowlby_One_SC({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',  // Especifica el peso de la fuente
    variable: '--font-bowlbyonesc'
});

export default function Menu() {
    const router = useRouter();
    const generados = new Set();
    const [codigoSala, setCodigoMenu] = useState("");
    const [codigoSalaValido, setCodigoSalaValido] = useState(false);

    function crearMenu() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo;

        do {
            codigo = '';
            for (let i = 0; i < 5; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
        } while (generados.has(codigo));
        
        generados.add(codigo);
        console.log(codigo);
        const params = new URLSearchParams(window.location.search);
        const UsuarioId = params.get("idUsuario");
        router.push(`/juego?codigo=${codigo}&idUsuario=${UsuarioId}`);
    }

    function unirMenu() {
        if (codigoSala.trim() === "") {
            alert("Por favor, ingresa un código de sala válido.");
            return;
        }

        setCodigoSalaValido(true);
        console.log("Unirse a la sala:", codigoSala);
    }

    function volverMenu() {
        setCodigoSalaValido(false);
        setCodigoMenu("");
    }

    return (
        <>
        <div className={`${styles.completo} ${bowlbyOneSC.variable}`}>
            <h1 className={`${styles.h1} ${bowlbyOneSC.className}`}>
                Messina's Pastry Parade
            </h1>
            {codigoSalaValido && (
                <div className={styles['button-container']}>
                    <Link href="../pages/Soldati/mostrador" className={styles.link}>
                        <Button text="Unirme al mostrador" variant="jugar" />
                    </Link>
                    <Link href="pages/Soldati/cocina" className={styles.link}>
                        <Button text="Unirme a la cocina" variant="jugar" />
                    </Link>
                    <Button 
                        text="Volver" 
                        variant="volver" 
                        onClick={volverMenu} 
                    />
                </div>
            )}
            
            {!codigoSalaValido && (
                <div className={styles['button-container']}>
                    <p className={styles.texto}>Unite a una sala multijugador:</p>
                    <Form handleChange={(e) => setCodigoMenu(e.target.value)} />
                    <br />
                    <Button 
                        text="Unirme" 
                        variant="jugar" 
                        onClick={unirMenu} 
                        disabled={codigoSala.trim() === ""}
                    />
                </div>
            )}
        </div>
        </>
    );
}

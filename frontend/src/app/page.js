"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Form from "@/components/Form";
import styles from "./page.module.css";
import { useState } from "react";
import Input from "@/components/Input";
import Link from "next/link"; // Importa Link

export default function Menu() {
    const router = useRouter();
    const generados = new Set();
    const [codigoSala, setCodigoMenu] = useState("");

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
        console.log("Unirse a la sala:", codigoSala);
    }

    return (
        <div className={styles.completo}>
            <Link href="/Soldati/mostrador">
                <Button text="Unirme al mostrador" variant="jugar" />
            </Link>
            <Link href="/Soldati/cocina">
                <Button text="Unirme a la cocina" variant="jugar" />
            </Link>
            <br />
            <p className={styles.texto}>Crear una sala multijugador:</p>
            <Form handleChange={(e) => setCodigoMenu(e.target.value)} />
            <br />
            <Button text="Unirme" variant="jugar" onClick={unirMenu} />
        </div>
    );
}

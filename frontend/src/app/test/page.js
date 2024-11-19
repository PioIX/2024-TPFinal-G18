"use client";

import { useState, useEffect } from "react";
import styles from "@/app/pages/Soldati/mostrador/mostradorsoldati.module.css";
import Score from "@/components/Score";
import Cliente from "@/components/Clientes";
import { useSocket } from "@/hooks/socket";

export default function MostradorLogica() {
    const [score, setScore] = useState(0); // Puntaje
    const [showRecipeModal, setShowRecipeModal] = useState(false); // Modal de recetas
    const [persianaAbierta, setPersianaAbierta] = useState(false); // Estado de la persiana
    const [clientes, setClientes] = useState([]); // Lista de clientes dinámicos
    const [budinURL, setBudinURL] = useState("/objetos/png.png"); // URL del budín
    const { socket, isConnected } = useSocket();

    // Obtener clientes desde el servidor
    useEffect(() => {
        async function fetchClientes() {
            const response = await fetch("http://localhost:4000/clientesPorEscenario?idEscenario=1");
            const data = await response.json();
            setClientes(data);
        }
        fetchClientes();
    }, []);

    // Configurar el budín desde el socket
    useEffect(() => {
        if (!socket) return;

        socket.on("budinMostrador", (data) => {
            const url = "/objetos/";
            setBudinURL(data.budin === "vainilla" ? `${url}budinLimonSoldati.png` : `${url}budinChocolateSoldati.png`);
        });
    }, [socket, isConnected]);

    // Mostrar clientes con un temporizador escalonado
    useEffect(() => {
        clientes.forEach((cliente, index) => {
            setTimeout(() => {
                actualizarCliente(index, { showImage: true, slideIn: true });
                setTimeout(() => actualizarCliente(index, { showDialogue: true }), 1000);
            }, index * 4000);
        });
    }, [clientes]);

    // Función para actualizar las propiedades de un cliente
    const actualizarCliente = (index, nuevasPropiedades) => {
        setClientes((prevClientes) =>
            prevClientes.map((cliente, i) => (i === index ? { ...cliente, ...nuevasPropiedades } : cliente))
        );
    };

    // Manejar la entrega de comida
    const handleGiveFood = (event, index) => {
        if (event.target.src === "/objetos/png.png") return; // Budín vacío

        actualizarCliente(index, { hasReceivedFood: true, farewellDialogue: true });
        setBudinURL("/objetos/png.png"); // Ocultar el budín después de entregarlo

        // Incrementar el puntaje y animar al cliente
        setTimeout(() => {
            setScore((prevScore) => prevScore + (clientes[index].esPolicia ? 100 : 50));
            actualizarCliente(index, { slideOut: true });
            setTimeout(() => actualizarCliente(index, { showImage: false }), 500);
        }, 2000);
    };

    // Manejar clic en el cliente
    const handleClientClick = (index) => {
        const cliente = clientes[index];
        if (cliente.hasReceivedFood) {
            actualizarCliente(index, { slideOut: true });
            setTimeout(() => actualizarCliente(index, { showImage: false }), 500);
        }
    };

    return (
        <div className={styles.imgSoldati}>
            <Score score={score} />

            {/* Renderizado de los clientes */}
            {clientes.map((cliente, index) => (
                <Cliente
                    key={cliente.id}
                    src={cliente.skin}
                    alt={cliente.nombre}
                    dialogue={cliente.comentarioLLegada}
                    farewellDialogue={cliente.comentarioSalida}
                    showImage={cliente.showImage}
                    slideIn={cliente.slideIn}
                    slideOut={cliente.slideOut}
                    showDialogue={cliente.showDialogue}
                    onClientClick={() => handleClientClick(index)}
                />
            ))}

            {/* Botón de recetas */}
            <button onClick={() => setShowRecipeModal(!showRecipeModal)} className={styles.openModalButton}>
                Recetas
            </button>

            {/* Modal de recetas */}
            {showRecipeModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button onClick={() => setShowRecipeModal(false)} className={styles.closeModalButton}>
                            X
                        </button>
                        <h3>Recetas</h3>
                        <ul>
                            <li>Budín de Chocolate: Budín + horno + chocolate</li>
                            <li>Budín de Vainilla: Budín + horno + vainilla</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Budín */}
            <img
                src={budinURL}
                alt="Budín"
                className={styles.budinImageContainer}
                onClick={(event) => {
                    const index = clientes.findIndex((c) => c.showImage && !c.hasReceivedFood);
                    if (index !== -1) handleGiveFood(event, index);
                }}
            />

            {/* Caja registradora */}
            <img
                src="/objetos/cajaRegistradoraSoldati.png"
                alt="Caja registradora"
                className={styles.imgCajaRegistradora}
            />

            {/* Persiana */}
            <div className={`${styles.persiana} ${persianaAbierta ? styles.abierta : ""}`} />
            <button className={styles.persianaButton} onClick={() => setPersianaAbierta(!persianaAbierta)}>
                {persianaAbierta ? "Subir Persiana" : "Bajar Persiana"}
            </button>
        </div>
    );
}

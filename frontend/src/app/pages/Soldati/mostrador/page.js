"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mostradorsoldati.module.css";
//import Mostrador from "@/components/Mostrador";
import Score from '@/components/Score';
import Cliente from "@/components/Clientes";
import { useSocket } from "@/hooks/socket";

export default function MostradorLogica() {
    const [score, setScore] = useState(0); // Definimos el estado para el puntaje
    const [showRecipeModal, setShowRecipeModal] = useState(false); // Estado para el modal de recetas
    const [persianaAbierta, setPersianaAbierta] = useState(false);
    const [clientes, setClientes] = useState([]);
    const { socket, isConnected } = useSocket();

    // Función para abrir/cerrar el modal de recetas
    const toggleRecipeModal = () => {
        setShowRecipeModal(!showRecipeModal);
    };

    // Estados para el cliente 1
    const [showImage1, setShowImage1] = useState(false);
    const [slideIn1, setSlideIn1] = useState(false);
    const [slideOut1, setSlideOut1] = useState(false);
    const [showDialogue1, setShowDialogue1] = useState(false);
    const [timeLeft1, setTimeLeft1] = useState(25);
    const [hasReceivedFood1, setHasReceivedFood1] = useState(false);
    const [farewellDialogue1, setFarewellDialogue1] = useState(false);

    // Estados para el cliente 2
    const [showImage2, setShowImage2] = useState(false);
    const [slideIn2, setSlideIn2] = useState(false);
    const [slideOut2, setSlideOut2] = useState(false);
    const [showDialogue2, setShowDialogue2] = useState(false);
    const [timeLeft2, setTimeLeft2] = useState(30);
    const [hasReceivedFood2, setHasReceivedFood2] = useState(false);
    const [farewellDialogue2, setFarewellDialogue2] = useState(false);

    // Estados para el policia
    const [showImage3, setShowImage3] = useState(false);
    const [slideIn3, setSlideIn3] = useState(false);
    const [slideOut3, setSlideOut3] = useState(false);
    const [showDialogue3, setShowDialogue3] = useState(false);
    const [timeLeft3, setTimeLeft3] = useState(5);
    const [hasClosedPersiana, setHasClosedPersiana] = useState(false);
    const [farewellDialogue3, setFarewellDialogue3] = useState(false);

    // Estados para budin / entregar budin
    const [budinURL, setbudinURL] = useState("/objetos/png.png");
    const [budinEvent, setBudinEvent] = useState();

    const playImgRef = useRef(null);
    const soundRef = useRef(null);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        obtenerClientesMezcladosPorNivel();

    }, [])

    async function obtenerClientesMezcladosPorNivel() {
        const response = await fetch("http://localhost:4000/clientesPorEscenario?idEscenario=1", { //idFijo porque se que es el 1
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const clientesSinMezclar = await response.json();
        let clientesMezclados = []
        /*
        for (let i=0; i<clientesSinMezclar.length; i++) {
            let numeroAleatorio = getRandomInt(clientesSinMezclar.length);
            let clienteRandom = clientesSinMezclar[numeroAleatorio];

            if (clientesMezclados.includes(clienteRandom)) {
                i--;
            } else {
                clientesMezclados.push(clienteRandom);
            }


        }
        */

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        clientesMezclados = clientesSinMezclar;
        //Por ahora pongo estos clientes, habría que poner los mezclados
        setClientes(clientesMezclados); 
    }


    useEffect(() => {
        if (!socket)
            return;

        socket.on("budinMostrador", (data) => {
            let url = "/objetos/";
            if (data.budin == "vainilla") {
                setbudinURL(url + "budinLimonSoldati.png");
            } else
                setbudinURL(url + "budinChocolateSoldati.png");

        })
    }, [socket, isConnected])

    // Configuración del cliente 1
    useEffect(() => {
        setTimeLeft1(30); // Configura el contador a 30 segundos

        const showImageTimer1 = setTimeout(() => {
            setShowImage1(true);
            setTimeout(() => setSlideIn1(true), 100);
        }, 4000);

        const dialogueTimer1 = setTimeout(() => setShowDialogue1(true), 5000);

        const countdownInterval1 = setInterval(() => {
            setTimeLeft1(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(countdownInterval1);
                return 0;
            });
        }, 1000);

        const hideImageTimer1 = setTimeout(() => {
            if (!hasReceivedFood1) {
                setSlideIn1(false);
                setSlideOut1(true);
                setShowDialogue1(false); // Oculta el diálogo cuando el cliente se va automáticamente
                const removeImageTimer1 = setTimeout(() => setShowImage1(false), 500);
                return () => clearTimeout(removeImageTimer1);
            }
        }, 31000);

        return () => {
            clearTimeout(showImageTimer1);
            clearTimeout(hideImageTimer1);
            clearTimeout(dialogueTimer1);
            clearInterval(countdownInterval1);
        };
    }, [hasReceivedFood1]);

    //Configuracion Cliente 2
    useEffect(() => {
        if (!hasReceivedFood2) {
            const showImageTimer2 = setTimeout(() => {
                setShowImage2(true);
                setTimeout(() => setSlideIn2(true), 100);

                // Inicializa el tiempo restante al aparecer el cliente
                setTimeLeft2(30);
            }, 33000);

            // Mostrar diálogo después de que el cliente aparece
            const dialogueTimer2 = setTimeout(() => setShowDialogue2(true), 34000);

            // Iniciar el contador solo cuando el cliente está visible y con tiempo inicializado
            const countdownInterval2 = setInterval(() => {
                setTimeLeft2(prev => {
                    if (prev > 0) return prev - 1;
                    clearInterval(countdownInterval2); // Detiene el contador al llegar a 0
                    return 0;
                });
            }, 1000);

            // Configuración para ocultar el cliente después de un tiempo
            const hideImageTimer2 = setTimeout(() => {
                if (!hasReceivedFood2) {
                    setSlideIn2(false);
                    setSlideOut2(true);
                    setShowDialogue2(false);
                    const removeImageTimer2 = setTimeout(() => {
                        setShowImage2(false);
                        setShowDialogue2(false);
                    }, 500);
                    return () => clearTimeout(removeImageTimer2);
                }
            }, 61000);

            return () => {
                clearTimeout(showImageTimer2);
                clearTimeout(hideImageTimer2);
                clearTimeout(dialogueTimer2);
                clearInterval(countdownInterval2);
            };
        }
    }, [hasReceivedFood2]);


    //Configuracion Cliente 3
    useEffect(() => {
        const showImageTimer3 = setTimeout(() => {
            setShowImage3(true);
            setTimeout(() => setSlideIn3(true), 100);

            // Inicializa el tiempo restante al aparecer el cliente
            setTimeLeft3(5);
        }, 50000);

        const dialogueTimer3 = setTimeout(() => setShowDialogue3(true), 31000);


        // Temporizador del policía
        const countdownInterval3 = setInterval(() => {
            setTimeLeft3(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(countdownInterval3);
                return 0;
            });
        }, 1000);

        // Configuración para ocultar al policía
        const hideImageTimer3 = setTimeout(() => {
            if (showImage3 && setTimeLeft3 === 0) {
                setSlideIn3(false);
                setSlideOut3(true);
                setShowDialogue3(false); // Oculta el diálogo cuando el policía se va
                setTimeout(() => setShowImage3(false), 500); // Esconde la imagen después de la animación
            }
        }, 5000);

        return () => {
            clearTimeout(showImageTimer3);
            clearInterval(countdownInterval3);
            clearTimeout(hideImageTimer3);
            clearInterval(countdownInterval3);
        };
    }, [persianaAbierta]); // El efecto se vuelve a ejecutar cuando cambia el estado de la persiana


    // Modificación en togglePersiana para cerrar el diálogo al cerrar la cortina
    const togglePersiana = () => {
        setPersianaAbierta(!persianaAbierta);

        if (!persianaAbierta && showImage3) {
            setSlideIn3(false);
            setSlideOut3(true);
            setShowDialogue3(false); // Oculta el diálogo cuando el policía se va
            setTimeout(() => setShowImage3(false), 500); // Esconde la imagen después de la animación
        }
    };



    // Función para entregar el budín al cliente
    const handleGiveFood = (event) => {
        //Con esto desaparece el budin

        // Cambiar la aparicion del budin

        if (event.target.src != "/objetos/png.png") {
            
            if (showImage1 && !hasReceivedFood1) {
                setBudinEvent(event);
                setHasReceivedFood1(true);
            } else if (showImage2 && !hasReceivedFood2) {
                setHasReceivedFood2(true);
            }
        }
    };

    const handleClientClick = (clientNumber) => {
        budinEvent.target.src = "/objetos/png.png";
        if (clientNumber === 1 && hasReceivedFood1) {
            setTimeLeft1(0);
            setFarewellDialogue1(true);
            setTimeout(() => {
                setScore(prevScore => prevScore + 50);
                setSlideIn1(false);
                setSlideOut1(true);
                setShowDialogue1(false);
                setFarewellDialogue1(false);
                setTimeout(() => setShowImage1(false), 500);
            }, 2000);
        } else if (clientNumber === 2 && hasReceivedFood2) {
            setTimeLeft2(0);
            setFarewellDialogue2(true);
            setTimeout(() => {
                setScore(prevScore => prevScore + 30);
                setSlideIn2(false);
                setSlideOut2(true);
                setShowDialogue2(false);
                setFarewellDialogue2(false);
                setTimeout(() => setShowImage2(false), 500);
            }, 2000);
        }
    };


    return (
        <div className={styles.imgSoldati}>
            <Score score={score} />
            
            {
                clientes.map(cliente => {
                    <Cliente src={cliente.skin} 
                    alt={cliente.nombre}
                    
                    ></Cliente>
                })
            }

            <Cliente
                src="/clientes/hombreSucio.png"
                alt="Cliente 1"
                dialogue={farewellDialogue1 ? "Gracia loco!" : "TENGO HAMBREEE, DAME UN BUDÍN DE CHOCOLATE!"}
                showImage={showImage1}
                slideIn={slideIn1}
                slideOut={slideOut1}
                showDialogue={showDialogue1 || farewellDialogue1}
                timeLeft={timeLeft1}
                onClientClick={() => handleClientClick(1)}
            />

            <Cliente
                src="/clientes/hombreChorro.png"
                alt="Cliente 2"
                dialogue={farewellDialogue2 ? "Tardaste una banda amigo, vuelvo a la noche" : "¡Dame un budín de vainilla, rápido!"}
                showImage={showImage2}
                slideIn={slideIn2}
                slideOut={slideOut2}
                showDialogue={showDialogue2 || farewellDialogue2}
                timeLeft={timeLeft2}
                onClientClick={() => handleClientClick(2)}
            />

            <Cliente
                src="/clientes/Policia.png"
                alt="Cliente 3"
                dialogue={farewellDialogue3 ? "Ya te voy a agarrar!" : "¡Necesito ver los papeles del negocio!"}
                showImage={showImage3}
                slideIn={slideIn3}
                slideOut={slideOut3}
                showDialogue={showDialogue3 || farewellDialogue3}
                timeLeft={timeLeft3}
            />


            {/* Botón de recetas */}
            <button onClick={toggleRecipeModal} className={styles.openModalButton}>
                Recetas
            </button>

            {/* Modal de recetas */}
            {showRecipeModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button onClick={toggleRecipeModal} className={styles.closeModalButton}>
                            X
                        </button>
                        <h3>Recetas</h3>
                        <ul>
                            <li>Budín de Chocolate: Budín + horno + chocolate</li>
                            <li>Budín de Vainilla: Budín + horno + vainilla</li>
                        </ul>
                        <h3>ALERTA!</h3>
                        <ul>
                            <li>Cuando cae la gorra cerrá todo</li>
                            <li>Cuando cae la noche, cuidado con jonatan</li>
                        </ul>
                    </div>
                </div>
            )}


            <img
                src={budinURL}
                alt="Budín"
                className={styles.budinImageContainer}
                onClick={handleGiveFood}
            />

            {/* Radio */}
            <img
                ref={playImgRef}
                className={styles.imgRadio}
                src="/objetos/Radio Soldati.png"
                id="playImg"
                alt="Play Radio"
            />

            <img
                src="/objetos/cajaRegistradoraSoldati.png"
                alt="Caja registradora"
                className={styles.imgCajaRegistradora}
            />

            <div>
                {/* Persiana */}
                <div className={`${styles.persiana} ${persianaAbierta ? styles.abierta : ""}`}></div>

                {/* Botón para abrir/cerrar persiana */}
                <button className={styles.persianaButton} onClick={togglePersiana}>
                    {persianaAbierta ? "Subir Persiana" : "Bajar Persiana"}
                </button>

                {/* Contenido restante */}
                <div className={styles.imgSoldati}>
                    {/* Otros elementos de tu componente */}
                </div>
            </div>
        </div>
    );
}
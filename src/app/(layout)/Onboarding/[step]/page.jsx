"use client"; // Important to ensure this runs client-side in Next.js 14

import { useState } from "react";
import { useRouter } from "next/navigation";

const OnboardingQuestions = () => {
    const router = useRouter();

    // Estado para almacenar todas las respuestas
    const [answers, setAnswers] = useState({
        group1: {},
        group2: {},
        group3: {},
    });

    // Definimos los grupos de preguntas
    const questionGroups = [
        {
            groupTitle: "Conozcámonos",
            groupKey: "group1",
            questions: [
                {
                    question: "¿Qué tipo de persona eres?",
                    options: ["Persona Natural", "Persona Jurídica"],
                    type: "options",
                },
            ],
        },
        {
            groupTitle: "Conozcámonos",
            groupKey: " group2",
            questions: [
                {
                    question: "Nombres",
                    type: "text",
                },

                {
                    question: "Primer apellido",
                    type: "text",
                },
                {
                    question: "Segundo apellido",
                    type: "text",
                },
                {
                    question: "Fecha de nacimiento",
                    type: "date",
                },
                {
                    question: "Proporcione una dirección de correo electrónico válida",
                    type: "text",
                },
                {
                    question: "País de nacimiento",
                    type: "text",
                },
                {
                    question: "Cual es su domicilio actual",
                    type: "text",
                },
                {
                    question: "Seleccione su tipo de documento de identificación",
                    options: ["Pasaporte", "DNI (Documento Nacional de Identidad)", "Otros"],
                    type: "options",
                },
                {
                    question: "Número de identificación personal",
                    type: "text",
                },


            ],
        },
        {
            groupTitle: "Datos laborales",
            groupKey: "group3",
            questions: [
                {
                    question: "¿Cuál es su situación laboral?",
                    options: [
                        "Trabajador/a autónomo/a",
                        "Empleado/a privado/a",
                        "Empleado/a gubernamental",
                        "Estudiante",
                        "Desempleado/a",
                        "Jubilado/a",
                        "Otros"
                      ],
                    type: "options",
                },
                {
                    question: "Selecciona su(s) actividad(es) económica(s)",
                    options:  [
                        "NINGUNA",
                        "ASOCIACIONES",
                        "BANCO",
                        "BLINDAJE",
                        "CASINOS Y CENTROS DE APUESTA",
                        "COMERCIALIZACIÓN DE JOYERÍA DE METALES Y PIEDRAS PRECIOSAS"
                      ],
                    type: "options",
                },
                {
                    question: "¿Es usted PEP?",
                    options: [
                        "No",
                        "Si",
                      
                      ],
                    type: "options",
                },
                {
                    question: "¿Tiene usted familiares cercanos PEP?",
                    options: [
                        "No",
                        "Si",
                      
                      ],
                    type: "options",
                },
                {
                    question: "¿Cuál estimas que será tu promedio transaccional por operación?",
                    type: "text",
                },
            ],
        },
        {
            groupTitle: "Transacciones",
            groupKey: "group4",
            questions: [
                {
                    question: "Indícanos el token y la red en la que opera tu walle",
                    options: [
                        "USDT - TRC20",
                        "USDC - ERC20",
                        "USDT - ERC20",
                        "USDC - TRC20",
                        "USDT - POLYGON",
                        "USDC - POLYGON",
                        "USDT - CELO",
                        "USDC - SOLANA",
                        "BTC - BITCOIN"
                      ],
                    type: "options",
                },
                {
                    question: "Indícanos el custodio de tu wallet",
                    options:  [
                        "Propio/a",
                        "Plataforma de intercambio (Ej. Binance, Coinbase)",
                        "Billetera de hardware (Ej. Ledger, Trezor)",
                        "Plataforma de custodia (Ej. Fireblocks, BitGo)",
                        "No estoy seguro/a",
                        "Otro"
                      ],
                    type: "options",
                },
            ],
        },
        {
            groupTitle: "Declaraciones Finales",
            groupKey: "group4",
            questions: [
                {
                    question: "Certifico que toda la información es cierta y verdadera",
                    options: [
                        "No",
                        "Si",
                      
                      ],
                    type: "options",
                },
                {
                    question: "Acepto que Kravata investigue y corrobore toda la información indicada en este formulario únicamente para fines de gestión de riesgos LA/FT/FPADM",
                    options: [
                        "No",
                        "Si",
                      
                      ],
                    type: "options",
                },
            ],
        },
    ];

    const [currentGroup, setCurrentGroup] = useState(0);

    // Maneja la respuesta para preguntas de tipo "opciones"
    const handleOptionAnswer = (groupKey, question, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [groupKey]: {
                ...prevAnswers[groupKey],
                [question]: answer,
            },
        }));
    };

    // Maneja la respuesta para preguntas de tipo "texto"
    const handleTextAnswer = (groupKey, question, e) => {
        const answer = e.target.value;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [groupKey]: {
                ...prevAnswers[groupKey],
                [question]: answer,
            },
        }));
    };

    // Verifica si todas las preguntas en el grupo actual están respondidas
    const isGroupValid = questionGroups[currentGroup].questions.every((q) => {
        const groupKey = questionGroups[currentGroup].groupKey;
        if (q.type === "text") {
            return answers[groupKey]?.[q.question]?.trim() !== "";
        }
        return answers[groupKey]?.[q.question];
    });

    // Navegar al siguiente grupo
    const nextGroup = () => {
        if (currentGroup < questionGroups.length - 1) {
            setCurrentGroup(currentGroup + 1);
        } else {
            handleSubmit();
        }
    };

    // Navegar al grupo anterior
    const previousGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
        }
    };

    // Enviar todas las respuestas
    const handleSubmit = () => {
        if (isGroupValid) {
            // Aquí puedes hacer algo con las respuestas, por ejemplo, enviarlas a un servidor
            console.log("Respuestas enviadas:", answers);
            router.push("/Onboarding/finish"); // Redirigir a la página de finalización
        } else {
            alert("Por favor, responde todas las preguntas.");
        }
    };

    return (
        <div className="relative w-full inset-0 flex justify-center items-center p-3 md:p-0">
            <div className="bg-white rounded-[5px] p-6 w-full max-w-[1000px] text-center">
                <h2 className="text-2xl font-bold mb-6 text-black">Onboarding</h2>

                {/* Mostrar el título del grupo actual */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800  ">{questionGroups[currentGroup].groupTitle}</h3>

                {/* Mostrar las preguntas del grupo actual */}
                {questionGroups[currentGroup].questions.map((question, idx) => (
                    <div key={idx} className="mb-6">
                        <p className="text-[16px] text-black font-semibold  w-full text-left">{question.question}</p>

                        {/* Si la pregunta es de tipo 'opciones', mostramos botones */}
                        {question.type === "options" && (
                            <div className="flex flex-col space-y-3">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleOptionAnswer(
                                                questionGroups[currentGroup].groupKey,
                                                question.question,
                                                option
                                            )
                                        }
                                        className={`px-4 py-2 bg-transparent text-gray-800 rounded-md border-[1px] ${answers[questionGroups[currentGroup].groupKey]?.[question.question] === option
                                                ? "bg-green-500 text-green-500 font-bold border-green-500" // Marcar la opción seleccionada con color
                                                : "hover:bg-green-500  border-gray-600"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Si la pregunta es de tipo 'texto', mostramos un campo de texto */}
                        {(question.type === "text" || question.type === "date") && (
                            <div className="flex flex-col space-y-3">
                                <input
                                    type={question.type }
                                    placeholder="Escribe tu respuesta aquí..."
                                    value={answers[questionGroups[currentGroup].groupKey]?.[question.question] || ""}
                                    onChange={(e) =>
                                        handleTextAnswer(questionGroups[currentGroup].groupKey, question.question, e)
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md text-black"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {/* Botones de navegación */}
                <div className="flex justify-between mt-6">
                    {currentGroup > 0 && (
                        <button
                            onClick={previousGroup}
                            className="px-6 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                        >
                            Anterior
                        </button>
                    )}

                    <button
                        onClick={currentGroup === questionGroups.length - 1 ? () => router.replace('/') : nextGroup}
                        className="px-6 py-3 bg-[#F1BA06] text-white rounded-md hover:bg-blue-600"
                        disabled={!isGroupValid}
                    >
                        {currentGroup === questionGroups.length - 1 ? "Enviar" : "Siguiente"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingQuestions;

"use client"; // Important to ensure this runs client-side in Next.js 14

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname for Next.js 14

const OnboardingQuestions = () => {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();

  // Extract the step from the URL pathname, which will be something like "/onboarding/[step]"
  const step = pathname.split('/').pop(); // Get the last segment of the URL (the step number)

  // Convert the step to a number or default to 0 if invalid
  const currentStep = step ? parseInt(step, 10) : 0;

  const [answers, setAnswers] = useState({});

  const questions = [
    {
      question: "¿Cuál es tu objetivo principal en nuestra aplicación?",
      options: ["Organizar tareas", "Mejorar productividad", "Seguimiento de proyectos"],
      type: "options",
    },
    {
      question: "¿Cuántos proyectos gestionas en promedio?",
      options: ["1-5", "6-10", "Más de 10"],
      type: "options",
    },
    {
      question: "¿Tienes alguna meta específica que te gustaría alcanzar?",
      type: "text",
    },
    {
      question: "¿Te gustaría recibir notificaciones?",
      options: ["Sí", "No"],
      type: "options",
    },
  ];

  // If the `step` is invalid or out of bounds, redirect to finish page
  if (isNaN(currentStep) || currentStep < 0 || currentStep >= questions.length) {
    useEffect(() => {
      router.push("/onboarding/finish");
    }, [router]);

    return null; // Prevent rendering while redirecting
  }

  // Handle the selected option answer
  const handleOptionAnswer = (answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentStep].question]: answer,
    }));
    nextStep();
  };

  // Handle the text answer input
  const handleTextAnswer = (e) => {
    const answer = e.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentStep].question]: answer,
    }));
  };

  // Move to the next step in the onboarding flow
  const nextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      router.push(`/onboarding/${nextStep}`); // Navigate to next step
    } else {
      router.push("/onboarding/finish"); // Redirect to finish page
    }
  };

  // Check if text answer is valid (required)
  const isTextAnswerValid = questions[currentStep].type === "text" && !answers[questions[currentStep].question];

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-[5px] max-h-[80vh]  p-6 w-full max-w-[1000px] text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">Onboarding</h2>
        <p className="text-lg mb-4 text-[14px] text-black">{questions[currentStep].question}</p>

        {/* Render options if question type is 'options' */}
        {questions[currentStep].type === "options" && (
          <div className="flex flex-col space-y-3">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionAnswer(option)}
                className="px-4 py-2 bg-trasparent text-gray-800 rounded-md hover:bg-green-500 border-gray-600 border-[1px]"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Render text input if question type is 'text' */}
        {questions[currentStep].type === "text" && (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Escribe tu respuesta aquí..."
              value={answers[questions[currentStep].question] || ""}
              onChange={handleTextAnswer}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={nextStep}
              className="mt-4 px-4 py-2 bg-[#F1BA06] text-white rounded-md hover:bg-blue-600"
              disabled={isTextAnswerValid}
            >
              {currentStep === questions.length - 1 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingQuestions;

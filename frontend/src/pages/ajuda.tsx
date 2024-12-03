"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
  
      if (storedRole) {
        setRole(storedRole);
      } else {
        setRole(null);
      }
  
      setIsLoading(false);
    }
  }, []);

  const faqs = [
    {
      question: "Qual é o horário de funcionamento?",
      answer: "Estamos abertos de segunda a sexta-feira, das 9h às 18h.",
    },
    {
      question: "Como faço para agendar um corte?",
      answer:
        "Você pode agendar um corte através da nossa página de agendamentos.",
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "As formas de pagamento são cartões de crédito, débito e pix.",
    },
    {
      question: "Posso cancelar meu agendamento?",
      answer:
        "Sim, você pode cancelar seu agendamento até 24 horas antes do horário marcado.",
    },
    {
        question: "Vocês fazem cortes para crianças?",
        answer:
          "Sim, realizamos cortes para crianças de todas as idades. Temos um ambiente amigável para os pequenos, tornando a experiência agradável.",
      },
      {
        question: "Posso agendar um horário para corte de cabelo e barba no mesmo dia?",
        answer:
          "Sim, você pode agendar ambos os serviços Oferecemos pacotes que incluem corte de cabelo e barba com descontos especiais.",
      },
  ];

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  const MenuItems =  () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || !role){
      return router.push('/login');
    }
    if(role === "cliente"){
      return(
        <>
          <li><a href="/home" className="nav-link">Home</a></li>
          <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
          <li><a href="/perfil" className="nav-link">Perfil</a></li>
          <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
          <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
        </>
      );
    }
    if(role === "admin"){
      return(
        <>
          <li><a href="/home" className="nav-link">Home</a></li>
          <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
          <li><a href="/servicos" className="nav-link">Serviços</a></li>
          <li><a href="/cadastro" className="nav-link">Cadastro</a></li>
          <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
          <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
        </>
      );
    }
    return null;
  }

  return (
    <div className="telafundo-custom"> {}
      {}
      <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
          {MenuItems()}
        </ul>
      </nav>
    </div>
  </header>

        {/* Conteúdo da página */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Perguntas Frequentes (FAQ)
          </h1>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <div
                  className="text-xl font-semibold text-black-500 cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                </div>
                {activeIndex === index && (
                  <div className="mt-2 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
      </div>
  );
};

export default FAQPage;

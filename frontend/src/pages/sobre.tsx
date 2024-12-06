"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SobreNos = () => {
  //const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      const token = localStorage.getItem("token");
  
      if (!token || !storedRole) {
        router.push("/login");
        return;
      }

      //setRole(storedRole);
      setIsLoading(false);
    }
  }, [router, isLoading]);

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
          <li><Link href="/home"><a className="nav-link">Home</a></Link></li>
          <li><Link href="/agendamento"><a className="nav-link">Agendamento</a></Link></li>
          <li><Link href="/perfil"><a className="nav-link">Perfil</a></Link></li>
          <li><Link href="/ajuda"><a className="nav-link">Ajuda</a></Link></li>
          <li><Link href="/sobre"><a className="nav-link">Sobre Nós</a></Link></li>
        </>
      );
    }
    if(role === "admin"){
      return(
        <>
           <li><Link href="/home"><a className="nav-link">Home</a></Link></li>
          <li><Link href="/agendamento"><a className="nav-link">Agendamento</a></Link></li>
          <li><Link href="/servicos"><a className="nav-link">Serviços</a></Link></li>
          <li><Link href="/cadastro"><a className="nav-link">Cadastro</a></Link></li>
          <li><Link href="/ajuda"><a className="nav-link">Ajuda</a></Link></li>
          <li><Link href="/sobre"><a className="nav-link">Sobre Nós</a></Link></li>
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

      {}
      <main className="container mx-auto px-4 py-8">
        <h2 className="subtitle text-center">Conheça a Barbearia</h2>

        {}
        <section>
          <h3>Nossa História</h3>
          <p>
            Fundada em 2019, na cidade de Indaiatuba, nós da Barbearia JP Cortes, acreditamos que o
            cuidado com o visual é um reflexo de quem somos. Nosso ambiente acolhedor e estiloso foi
            pensado para que cada visita seja um momento de relaxamento e cuidado pessoal. Aqui, nossos
            barbeiros são profissionais apaixonados pelo que fazem, com habilidades afiadas e atenção aos
            detalhes. Buscando sempre realçar o estilo e a personalidade de cada cliente.
          </p>
        </section>

        {/* Visão */}
        <section>
          <h3>Visão</h3>
          <p>
            Ser reconhecida como a barbearia referência na cidade, oferencendo um ambiente inovador e serviços
            de alta qualidade. Sempre em sintonia com as últimas tendências de estilo masculino. Buscamos criar
            uma comunidade de clientes que se sintam em casa, valorizando não apenas a aparência, mas também o
            bem-estar e a autoestima de cada um.
          </p>
        </section>

        {/* Missão */}
        <section>
          <h3>Missão</h3>
          <p>
            Proporcionar aos nossos clientes um serviço de excelência, com cortes de cabelo e tratamentos de barba de alta
            qualidade, combinando o melhor da tradição e da modernidade. Acreditamos que cada homem merece se sentir único
            e confiante e trabalhamos para oferecer uma experiência personalizada, acolhedora e sofisticada, onde o estilo e
            o conforto andam juntos.
          </p>
        </section>

        {/* Localização e Contato */}
        <section>
          <h3>Localização e Contato</h3>
          <p>
            Estamos localizados no centro da cidade, com fácil acesso para todos. 
            Entre em contato conosco para agendar seu horário ou tirar dúvidas.
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58409.13373867318!2d-47.2431022!3d-23.1245227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf4ce98392d949%3A0xf8902daaf0f582b2!2sBARBEARIA%20JP!5e0!3m2!1spt-BR!2sbr!4v1695821016107!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-md shadow-md"
          ></iframe>
        </section>
      {/* Rodapé */}
      </main>
      <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
    </div>
    
  );
};

export default SobreNos;

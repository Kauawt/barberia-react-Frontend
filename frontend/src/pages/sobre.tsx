"use client";

import React from "react";
import Link from "next/link";

const SobreNos = () => {
  return (
    <div className="telafundo-custom min-h-screen">
       
        {/* Cabeçalho */}
        <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
          <li><a href="/home" className="nav-link">Home</a></li>
          <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
          <li><a href="/cliente" className="nav-link">Cliente</a></li>
          <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
          <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
        </ul>
      </nav>
    </div>
  </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="subtitle text-center">Conheça a Barbearia</h2>

        {/* Nossa História */}
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

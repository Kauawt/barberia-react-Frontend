"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
//import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [noticias, setNoticias] = useState<
    { titulo: string; descricao: string; link: string }[]
  >([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novaNoticia, setNovaNoticia] = useState({
    titulo: "",
    descricao: "",
    link: "",
  });

  // Carregamento de notícias
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      // Se não houver token ou role no localStorage, redireciona para login
      if (!token || !storedRole) {
        router.push("/login");
        return;
      }

      setRole(storedRole);
      setIsLoading(false); // Atualiza o estado de carregamento após pegar a role

    const fetchNoticias = async () => {
      const noticiasSimuladas = [
        {
          titulo: "Top 10 Pomadas para Modelar o Cabelo Masculino",
          descricao: "Descubra as melhores pomadas para deixar seu cabelo estiloso.",
          link: "https://julianecost.com/top-10-melhores-pomadas-para-cabelo-masculino-atualizado/",
        },
        {
          titulo: "Como tratar a Calvície: Dicas e Tratamentos Eficazes",
          descricao: "Saiba como tratar e prevenir a calvície com essas dicas.",
          link: "https://www.tuasaude.com/4-formas-de-tratar-a-calvicie/",
        },
        {
          titulo: "12 Corte de Cabelo Crespo Masculino: Confira tendências em 2024",
          descricao: "Confira as tendências de cortes masculinos.",
          link: "https://manualdohomemmoderno.com.br/cabelo/corte-de-cabelo-crespo-masculino",
        },
        {
          titulo: "Cuidados com a barba: veja dicas e produtos",
          descricao: "Saiba como cuidar da sua barba da melhor forma.",
          link: "https://www.samsclub.com.br/blog/beleza-e-saude/cuidados-com-a-barba-veja-dicas-e-produtos/",
        },
      ];
      setNoticias(noticiasSimuladas);
    };

    fetchNoticias();
  }}, [router]);
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  

  const adicionarNoticia = () => {
    if (novaNoticia.titulo.trim() && novaNoticia.descricao.trim() && novaNoticia.link.trim()) {
      setNoticias((prevNoticias) => [...prevNoticias, novaNoticia]);
      setNovaNoticia({ titulo: "", descricao: "", link: "" });
      setMostrarFormulario(false); // Fecha o formulário
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setDropdownOpen(!isDropdownOpen);

    // Limpa qualquer timeout anterior
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // Fecha o dropdown automaticamente após 1,5 segundos se nenhuma interação ocorrer
    if (!isDropdownOpen) {
      closeTimeoutRef.current = setTimeout(() => {
        setDropdownOpen(false);
      }, 1500);
    }
  };

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
          <li className="relative flex items-center">
            <a href="/sobre" className="nav-link">Sobre Nós</a>
            <span className="nav-link cursor-pointer px-0.5" onClick={toggleDropdown}
            >▼</span>
            {isDropdownOpen && (
              <ul className="absolute text-orange-500 button-sair">
                <li><span onClick={handleLogout}
                    className="block text-orange-500 hover:text-red-700 cursor-pointer"
                  >Sair</span></li></ul>)}</li>
        </>
      );
    }

    if (role === "admin") {
      return (
        <>
          <li><a href="/home" className="nav-link">Home</a></li>
          <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
          <li><a href="/servicos" className="nav-link">Serviços</a></li>
          <li><a href="/cadastro" className="nav-link">Cadastro</a></li>
          <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
          <li className="relative flex items-center">
            <a href="/sobre" className="nav-link">Sobre Nós</a>
            <span className="nav-link cursor-pointer px-0.5" onClick={toggleDropdown}
            >▼</span>
            {isDropdownOpen && (
              <ul className="absolute text-orange-500 button-sair">
                <li><span onClick={handleLogout}
                    className="block text-orange-500 hover:text-red-700 cursor-pointer"
                  >Sair</span></li></ul>)}</li>
        </>
      );
    }

    return null;
  };

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
      <main className="container mx-auto py-8 px-4">
        <h2 className="subtitle mb-4">Bem-vindo à JP Cortes Barbearia</h2>
        <p className="text mb-6">Confira as últimas novidades e dicas sobre cuidados com cabelo e barba.</p>

        {}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="subtitle">Últimas Notícias</h3>
            <button onClick={() => setMostrarFormulario(true)} className="button-add">+</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.length > 0 ? (
              noticias.map((noticia, index) => (
                <div key={index} className="card relative">
                  {}
                  <button
                    onClick={() =>
                      setNoticias((prevNoticias) =>
                        prevNoticias.filter((_, i) => i !== index)
                      )
                    }
                    className="delete-button"
                  >
                    ✖
                  </button>
                  <h4 className="font-bold text-lg mb-2">{noticia.titulo}</h4>
                  <p className="text-sm text-gray-600 mb-2">{noticia.descricao}</p>
                  <a
                    href={noticia.link}
                    className="text-blue-500 underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leia mais
                  </a>
                </div>
              ))
            ) : (
              <p>Carregando notícias...</p>
            )}
          </div>
        </section>
      </main>

      {}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Adicionar Nova Notícia</h3>
            <input
              type="text"
              value={novaNoticia.titulo}
              onChange={(e) => setNovaNoticia({ ...novaNoticia, titulo: e.target.value })}
              placeholder="Título"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <textarea
              value={novaNoticia.descricao}
              onChange={(e) => setNovaNoticia({ ...novaNoticia, descricao: e.target.value })}
              placeholder="Descrição"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            ></textarea>
            <input
              type="text"
              value={novaNoticia.link}
              onChange={(e) => setNovaNoticia({ ...novaNoticia, link: e.target.value })}
              placeholder="Link"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarNoticia}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

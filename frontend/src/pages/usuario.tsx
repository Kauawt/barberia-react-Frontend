// pages/usuario.tsx
import { useState, useEffect } from 'react';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../services/APIService'; // Importando as funções diretamente

const UsuarioPage = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Função para buscar todos os usuários
  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
    }
  };

  // Função para criar ou editar usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const userData = { nome, email, senha };

    try {
      if (editingUserId) {
        await updateUsuario(editingUserId, userData);
      } else {
        await createUsuario(userData);
      }
      fetchUsuarios(); // Recarrega a lista de usuários
      setNome('');
      setEmail('');
      setSenha('');
      setEditingUserId(null);
    } catch (err) {
      setError('Falha ao salvar usuário');
    }
  };

  // Função para excluir usuário
  const handleDelete = async (id: number) => {
    try {
      await deleteUsuario(id);
      fetchUsuarios(); // Recarrega a lista de usuários
    } catch (err) {
      setError('Falha ao excluir usuário');
    }
  };

  // Função para iniciar o processo de edição
  const handleEdit = (usuario: any) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setSenha('');
    setEditingUserId(usuario.id);
  };

  // Carregar os usuários quando a página for carregada
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>

      <form onSubmit={handleSubmit}>
        <h2>{editingUserId ? 'Editar Usuário' : 'Criar Usuário'}</h2>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{editingUserId ? 'Atualizar' : 'Criar'}</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
            <button onClick={() => handleEdit(usuario)}>Editar</button>
            <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioPage;

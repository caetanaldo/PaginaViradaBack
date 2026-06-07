import Livro from "../models/Livro.js";

const livroController = {
  async listar(req, res) {
    try {
      const livros = await Livro.findAll();
      return res.status(200).json(livros);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
      res.status(200).json(livro);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async criar(req, res) {
    try {
      const { titulo, autor, descricao, preco, estoque, capa } = req.body;
      if (!titulo || !autor || !preco) {
        return res
          .status(400)
          .json({ erro: "Título, autor e preço são obrigatórios" });
      }

      const livro = await Livro.create({
        titulo,
        autor,
        descricao,
        preco,
        estoque,
        capa,
      });
      return res.status(201).json(livro);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const livro = await Livro.findByPk(req.params.id);
if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
      await livro.update(req.body);
      return res.status(200).json(livro);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
      await livro.destroy();
      return res.status(200).json({ mensagem: 'Livro deletado com sucesso' });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};

export default livroController;

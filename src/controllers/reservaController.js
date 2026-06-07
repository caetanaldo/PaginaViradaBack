import Livro from "../models/Livro.js";
import Reserva from "../models/Reserva.js";
import Usuario from "../models/Usuario.js";

const reservaController = {
  async criar(req, res) {
    try {
      const { livroId } = req.body;
      const usuarioId = req.usuario.id;

      const livro = await Livro.findByPk(livroId);
      if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
      }

      if (livro.estoque <= 0) {
        return res
          .status(400)
          .json({ erro: "Livro indisponível para reserva" });
      }

      const reserva = await Reserva.create({
        usuarioId,
        livroId,
      });
      await livro.update({ estoque: livro.estoque - 1 });

      return res.status(201).json(reserva);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async listarMinhasReservas(req, res) {
    try {
      const reservas = await Reserva.findAll({
        where: { usuarioId: req.usuario.id },
        include: [{ model: Livro, as: "livro" }],
      });
      return res.json(reservas);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async listarTodasReservas(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Livro, as: "livro" },
          { model: Usuario, as: "usuario", attributes: ["id", "nome", "email"] },
        ],
      });
      return res.json(reservas);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

    async cancelar(req, res) {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) {
            return res.status(404).json({ erro: "Reserva não encontrada" });
        }
        if (reserva.usuarioId !== req.usuario.id && req.usuario.tipo !== 'admin') {
            return res.status(403).json({ erro: "Sem permissão para cancelar esta reserva" });
        }

        const livro = await Livro.findByPk(reserva.livroId);
        if (livro) {
            await livro.update({ estoque: livro.estoque + 1 });
        }

        await reserva.update({ status: "cancelada" });

        return res.json({ mensagem: "Reserva cancelada com sucesso" });
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}
};

export default reservaController;

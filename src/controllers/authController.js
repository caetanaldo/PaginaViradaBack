import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const authController = {
    async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body

            if (!nome || !email || !senha) {
                return res.status(400).json({ error: 'Email já cadastrado' })
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10)

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada
            })

            return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: usuario.id })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err.message })
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body

            if (!email || !senha) {
                return res.status(400).json({ erro: 'Preencha email e senha' })
            }

            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                res.status(404).json({ erro: 'Usuário não encontrado' })
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if (!senhaValida) {
                res.status(404).json({ erro: 'Senha incorreta' })
            }

            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            return res.status(200).json({ token, tipo: usuario.tipo, nome: usuario.nome })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao fazer login', detalhe: err.message });
        }
    }
}

export default authController
import jwt from 'jsonwebtoken'

const authMiddleware = {
    verificarToken(req, res, next) {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ erro: 'Token não fornecido' })
        }

        const token = authHeader.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.usuario = decoded
            next()
        } catch (err) {
            return res.status(401).json({ erro: 'Token inválido ou expirado' });
        }
    },

    verificarAdmin(req, res, next) {
        if (req.usuario.tipo !== 'admin') {
            return res.status(403).json({ erro: 'Acesso restrito a administradores' });
        }
        next()
    }
}

export default authMiddleware
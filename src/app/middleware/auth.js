import jwt from 'jsonwebtoken'
import Driver from '../models/Driver'

const auth = async (req, res, next) => {
    try {
        //LÊ O HEADER AUTHORIZATION
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        //VALIDA O TOKEN
        const decoded = jwt.verify(token, 'PARKINGLOT')
        console.log(decoded)
        //SEARCH FOR A USER WITH THIS TOKEN
        const driver = await Driver.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!driver) {
            throw new Error()
        }
        req.token = token
        //GUARDA O USUÁRIO PARA PODER SER USADO PELAS FUNÇÕES QUE VÊM DEPOIS
        req.driver = driver
        next()
    } catch (e) {
        //NOT AUTHENTICATED ERROR
        res.status(401).send({ error: "Please authenticate" })
    }
}

module.exports = auth
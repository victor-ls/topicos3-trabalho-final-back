import Driver from "../models/Driver"

class DriverController {
    async index(req, res) {
        try {
            const driver = await Driver.find()

            return res.status(200).json(driver)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async store(req, res) {
        const { name, licensePlate, cpf, email, password, is_pne } = req.body

        const driver = await Driver.findOne({ 'cpf': cpf })

        if (driver) {
            return res.status(400).json({ message: "Motorista já está cadastrado" })
        }

        if (!(name && licensePlate && cpf && email && password && is_pne)) {
            return res.status(422).json({ message: "Nome, Placa do Carro, CPF, Email, Senha e Informação de deficiência são obrigatórios" })
        }

        try {
            const driver = await Driver.create(req.body)

            return res.status(201).json(driver)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async update(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do motorista" })
        }

        const driverToUpdate = await Driver.findOne({
            _id: req.params.id
        })

        if (!driverToUpdate) {
            return res.status(422).json({ message: "Motorista não encontrado" })
        }

        try {
            await Driver.update(req.body)

        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }

        return res.status(200).json({ message: "Dados do motorista atualizados com sucesso" })
    }

    async delete(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do motorista" })
        }

        try {
            await Driver.deleteOne({
                _id: req.params.id
            })
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
        return res.json({ message: "O motorista foi excluído" })
    }
}

export default new DriverController()
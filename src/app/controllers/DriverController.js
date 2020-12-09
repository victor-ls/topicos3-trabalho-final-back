import moment from 'moment'
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
        const { name, cars, cpf, email, password, deficiency } = req.body

        const driver = await Driver.findOne({ 'cpf': cpf })

        console.log(driver)

        if (driver) {
            return res.status(400).json({ message: "Motorista já está cadastrado" })
        }

        if (!(name && cars && cpf && email && password && deficiency)) {
            return res.status(422).json({ message: "Nome, Placa do Carro, CPF, Email, Senha e Informação de deficiência são obrigatórios" })
        }

        try {
            const driver = await Driver.create(req.body)
            console.log(driver)

            //const token = await driver.generateAuthToken()

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

    async login(req, res) {
        console.log('login')
        //try {
        console.log(req.driver)
        const driver = req.driver
        const token = await driver.generateAuthToken()
        res.send({ driver, token })
        //}/* catch (err) {
        //res.status(400).send()
    }


    async arrival(req, res) {
        const arrivalTime = moment()

        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do motorista" })
        }

        try {
            const driver = await Driver.findOneAndUpdate({
                _id: req.params.id
            }, {
                arrivalTime
            }, { new: true })

            return res.status(201).json(driver)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async departure(req, res) {
        const departureTime = moment()

        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do motorista" })
        }

        try {
            const driver = await Driver.findOneAndUpdate({
                _id: req.params.id
            }, {
                departureTime
            }, { new: true })

            let arrival = driver.arrivalTime

            const totalTime = (departureTime.diff(arrival, 'minutes'))

            return res.status(201).json({ message: `Você ficou ${totalTime} minutos no estacionamento. Você deve ${totalTime * 0.10} reais` })

        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }
}

export default new DriverController()
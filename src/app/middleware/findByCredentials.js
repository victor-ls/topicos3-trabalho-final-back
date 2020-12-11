import Driver from "../models/Driver"
import bcrypt from "bcryptjs"

const findByCredentials = async (req, res, next) => {
    const { email, password } = req.body
    const driver = await Driver.findOne({ email })
    console.log(driver)
    if (!driver) {
        throw new Error("Unable to login")
    }
    console.log(driver.name)

    const isMatch = await bcrypt.compare(password, driver.password)
    console.log(isMatch)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    req.driver = driver

    next()

}

module.exports = findByCredentials
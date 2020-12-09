import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"; ''
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const DriverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cars: [{
            licensePlate: String,
            brand: String
        }],
        /*licensePlate: {
            type: String,
            required: true
        },*/
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        deficiency: {
            type: Boolean,
            required: true
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        arrivalTime: {
            type: Date
        },
        departureTime: {
            type: Date
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

DriverSchema.plugin(autoIncrement.plugin, {
    model: "Driver",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});

DriverSchema.pre('save', async function (next) {
    const driver = this
    if (driver.isModified('password')) {
        driver.password = await bcrypt.hash(driver.password, 8)
    }
    //GETS CALLED TO GO TO THE SAVE FUNCTION
    next()
})


DriverSchema.methods.generateAuthToken = async function () {
    const driver = this
    const token = jwt.sign({ _id: driver._id.toString() }, 'PARKINGLOT')
    //CONCATENATE TO THE TOKEN OBJECT AND SAVE IT TO THE DATABASE
    driver.tokens = driver.tokens.concat({ token: token })
    await driver.save()
    return token
}

export default mongoose.model("Driver", DriverSchema);
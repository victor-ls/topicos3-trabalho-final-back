import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const DriverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        licensePlate: {
            type: String,
            required: true
        },
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
        is_pne: {
            type: Boolean,
            required: true
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

export default mongoose.model("Driver", DriverSchema);
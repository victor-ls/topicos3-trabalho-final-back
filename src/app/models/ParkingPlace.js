import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const ParkingPlaceSchema = new mongoose.Schema(
    {
        isFree: {
            type: Boolean,
            required: true
        },
        //history: {
        //
        //},
    {
        versionKey: false,
        timestamps: true,
    }
);

ParkingPlaceSchema.plugin(autoIncrement.plugin, {
    model: "ParkingPlace",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});

export default mongoose.model("Parking", ParkingPlaceSchema);
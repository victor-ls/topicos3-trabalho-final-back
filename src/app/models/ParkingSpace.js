import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const ParkingSpaceSchema = new mongoose.Schema(
    {
        isFree: {
            type: Boolean,
            required: true
        },
        numericID: {
            type: Number,
            required: true
        },
        parkingLot_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parking',
            required: true
        },
        history: [{
            driver_id: String,
            entryTime: Date,
            departureTime: Date,
        }],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

ParkingSpaceSchema.plugin(autoIncrement.plugin, {
    model: "ParkingSpace",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});

export default mongoose.model("ParkingSpace", ParkingSpaceSchema);
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

        parkingLot: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parking',
            required: true
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
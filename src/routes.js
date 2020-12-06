import { Router } from "express";

import DriverController from "./app/controllers/DriverController";
import ParkingController from "./app/controllers/ParkingController";
import ParkingSpaceController from "./app/controllers/ParkingSpaceController";
import getParkingLot from "./app/middleware/getParkingLot.js"

const routes = new Router();

routes.get("/driver", DriverController.index);
routes.post("/driver", DriverController.store);
routes.put("/driver/:id", DriverController.update);
routes.delete("/driver/:id", DriverController.delete)
routes.post("/driver/arrival/:id", DriverController.arrival)
routes.post("/driver/departure/:id", DriverController.departure)
routes.post("/parkingLot", ParkingController.store)
routes.get("/parkingLot/", ParkingController.index)
routes.get("/parkingLot/:id", ParkingController.checkParkingLot)
routes.post("/parkingLot/:parkingLotId", ParkingSpaceController.index)
routes.post("/parkingSpaces/:parkingLotId/:numberOfSpaces", getParkingLot, ParkingSpaceController.store)


export default routes;

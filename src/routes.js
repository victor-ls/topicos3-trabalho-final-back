import { Router } from "express";

import DriverController from "./app/controllers/DriverController";
import ParkingController from "./app/controllers/ParkingController";
import ParkingSpaceController from "./app/controllers/ParkingSpaceController";
import getParkingLot from "./app/middleware/getParkingLot.js"
import findByCredentials from "./app/middleware/findByCredentials"
import auth from "./app/middleware/auth.js"

const routes = new Router();

routes.get("/driver", DriverController.index);
routes.post("/driver", DriverController.store);
routes.put("/driver/:id", auth, DriverController.update);
routes.delete("/driver/", auth, DriverController.delete)
routes.post("/driver/login", findByCredentials, DriverController.login)
routes.post("/driver/logout", auth, DriverController.logout)
routes.post("/driver/arrival/:id", auth, DriverController.arrival)
routes.post("/driver/departure/:id", auth, DriverController.departure)
routes.post("/parkingLot", ParkingController.store)
routes.get("/parkingLot/", ParkingController.index)
routes.get("/parkingLot/:id", ParkingController.checkParkingLot)
routes.get("/parkingLot/:parkingLotId", ParkingSpaceController.index)
routes.post("/parkingSpaces/:parkingLotId/:numberOfSpaces", getParkingLot, ParkingSpaceController.store)


export default routes;

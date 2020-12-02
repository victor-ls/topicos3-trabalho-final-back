import { Router } from "express";

import DriverController from "./app/controllers/DriverController";

const routes = new Router();

routes.get("/driver", DriverController.index);
routes.post("/driver", DriverController.store);
routes.put("/driver/:id", DriverController.update);
routes.delete("/driver/:id", DriverController.delete)
routes.post("/driver/arrival/:id", DriverController.arrival)
routes.post("/driver/departure/:id", DriverController.departure)


export default routes;

import { Router } from "express";

import DriverController from "./app/controllers/DriverController";

const routes = new Router();

routes.get("/driver", DriverController.index);
routes.post("/driver", DriverController.store);
routes.put("/driver/:id", DriverController.update);
routes.delete("/driver/:id", DriverController.delete)


export default routes;

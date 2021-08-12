import Router from "express-promise-router";
import plantsController from "./controllers/plants.controller";
const plantsRouter = Router();

// GET
plantsRouter.get('/', plantsController.getPlants);
plantsRouter.get('/habitats', plantsController.getHabitats);

// POST
plantsRouter.post('/', plantsController.insertPlant);

// PATCH
plantsRouter.patch('/:idPlant', plantsController.verifyPlant);
plantsRouter.patch('/:idPlant/valuation', plantsController.updatePlantValuation);

export default plantsRouter;

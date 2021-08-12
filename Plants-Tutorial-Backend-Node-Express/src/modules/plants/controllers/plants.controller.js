import { logger } from "../../../utils/logger";
import plantsService from "../services/plants.service";

const plantsController = {};
const context = "Plants Controller";

plantsController.getPlants = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting plants info`);
        const resp = await plantsService.getPlants();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

plantsController.getHabitats = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting habitats info`);
        const resp = await plantsService.getHabitats();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

plantsController.insertPlant = async (req, res, next) => {
    try {
        const name = req.body.name;
        const valuation = req.body.valuation;
        const species = req.body.species;
        const idHabitat = req.body.idHabitat;
        logger.info(`[${context}]: Getting habitats info`);
        await plantsService.insertPlant(name, valuation, species, idHabitat);
        res.status(200).send({
            status: "Plant saved"
        });
    } catch (error) {
        next(error);
    }
}

plantsController.verifyPlant = async (req, res, next) => {
    try {
        const idPlant = req.params.idPlant;
        logger.info(`[${context}]: Verifiying plant`);
        await plantsService.verifyPlant(idPlant);
        res.status(200).send({
            status: "Plant verified"
        });
    } catch (error) {
        next(error);
    }
}

plantsController.updatePlantValuation = async (req, res, next) => {
    try {
        const idPlant = req.params.idPlant;
        const valuation = req.body.valuation;
        logger.info(`[${context}]: Verifiying plant`);
        await plantsService.updatePlantValuation(idPlant, valuation);
        res.status(200).send({
            status: "Plant updated"
        });
    } catch (error) {
        next(error);
    }
}

export default plantsController;
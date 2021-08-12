import { logger } from "../../../utils/logger";
import plantsPGRepository from "../repositories/plants.pg.repository";

const plantsService = {};
const context = "Plants Service";

plantsService.getPlants = async () => {
    logger.debug(`[${context}]: Consulting the data sources`);
    const info = await plantsPGRepository.getPlants();
    return info;
};

plantsService.getHabitats = async () => {
    logger.debug(`[${context}]: Consulting the data sources`);
    const info = await plantsPGRepository.getHabitats();
    return info;
};

plantsService.insertPlant = async (name, valuation, species, idHabitat) => {
    logger.debug(`[${context}]: Inserting plant in the db`);
    await plantsPGRepository.insertPlant(name, valuation, species, idHabitat);
};

plantsService.verifyPlant = async (idPlant) => {
    logger.debug(`[${context}]: Verifying plant in the db`);
    await plantsPGRepository.verifyPlant(idPlant);
};

plantsService.updatePlantValuation = async (idPlant, valuation) => {
    logger.debug(`[${context}]: Updating plant valuation in the db`);
    await plantsPGRepository.updatePlantValuation(idPlant, valuation);
};

export default plantsService;
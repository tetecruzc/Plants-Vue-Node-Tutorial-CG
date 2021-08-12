import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import PGQuery from "../../../utils/pg.queries";

const plantsPGRepository = {};
const context = "Plants PG Repository";

plantsPGRepository.getPlants = async () => {
    logger.debug(`[${context}]: Obtaning plants from pg`);
    await pool.query(PGQuery.setSchema());
    const resp = await pool.query(PGQuery.getPlants());
    return resp.rows;
};

plantsPGRepository.getHabitats = async () => {
    logger.debug(`[${context}]: Obtaning habitats from pg`);
    await pool.query(PGQuery.setSchema());
    const resp = await pool.query(PGQuery.getHabitats());
    return resp.rows;
};

plantsPGRepository.insertPlant = async (name, valuation, species, idHabitat) => {
    logger.debug(`[${context}]: Saving plant in pg`);
    await pool.query(PGQuery.setSchema());
    await pool.query(PGQuery.insertPlant(name, valuation, species, idHabitat));
};

plantsPGRepository.verifyPlant = async (idPlant) => {
    logger.debug(`[${context}]: Verifying plant in pg`);
    await pool.query(PGQuery.setSchema());
    await pool.query(PGQuery.verifyPlant(idPlant));
};

plantsPGRepository.updatePlantValuation = async (idPlant, valuation) => {
    logger.debug(`[${context}]: Updating valuation in pg`);
    await pool.query(PGQuery.setSchema());
    await pool.query(PGQuery.updatePlantValuation(idPlant, valuation));
};

export default plantsPGRepository;
import { env } from "./enviroment";

let PGQuery = {};

PGQuery.setSchema = () => {
    return `
        set schema '${env.PG_DB_SCHEMA}';
    `
};

PGQuery.getPlants = () => {
    return {
        text: `
            select * from sp_lnk_plant_records_get();
        `
    }
};

PGQuery.getHabitats = () => {
    return {
        text: `
            select * from sp_ms_plant_habitats_get();
        `
    }
};

PGQuery.insertPlant = (name, valuation, species, idHabitat) => {
    return {
        text: `
            select * from sp_lnk_plant_records_insert($1,$2,$3,$4);
        `,
        values: [name, valuation, species, idHabitat]
    }
};

PGQuery.verifyPlant = (idPlant) => {
    return {
        text: `
            select * from sp_lnk_plant_records_verify_plant($1);
        `,
        values: [idPlant]
    }
};

PGQuery.updatePlantValuation = (idPlant, valuation) => {
    return {
        text: `
            select sp_lnk_plant_records_update_valoration($1, $2);
        `,
        values: [idPlant, valuation]
    }
};

export default PGQuery;

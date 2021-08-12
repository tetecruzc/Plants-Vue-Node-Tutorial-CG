import Router from "express-promise-router";
import plantsRouter from "../modules/plants/plants.routes";
const router = Router();

router.use('/plants', plantsRouter);

export default router;
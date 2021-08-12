import { AxiosRepository } from '@/http/axios.repository';
import { Plant } from '../interfaces/plant.interface';

const RESOURCE = 'plants';

export class PlantsRepository extends AxiosRepository {
    
    async getPlants(): Promise<Plant[]> { 
        return super.getAll(RESOURCE);
    }

    async savePlant(plant: Plant){
        return super.post(plant,RESOURCE)
    }

}

export const plantsHttpRepository = new PlantsRepository();
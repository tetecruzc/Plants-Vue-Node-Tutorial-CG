import { AxiosRepository } from '@/http/axios.repository';
import { Habitat } from '../interfaces/habitats.interface';

const RESOURCE = 'plants/habitats';

export class HabitatsRepository extends AxiosRepository {
    
    async getHabitats(): Promise<Habitat[]> { 
        return super.getAll(RESOURCE);
    }

}

export const habitatsHttpRepository = new HabitatsRepository();
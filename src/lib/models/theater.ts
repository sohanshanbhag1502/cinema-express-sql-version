import { z } from 'zod';
import { City } from '@prisma/client';

const TheaterSchema = z.object({
    theId: z.string().min(5).max(5),
    name: z.string().max(255),
    city: z.nativeEnum(City),
    address: z.string().max(255)
})

export default TheaterSchema;

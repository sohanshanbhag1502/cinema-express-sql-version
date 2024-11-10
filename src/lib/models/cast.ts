import { z } from 'zod';
import { CastRole } from '@prisma/client';

const CastSchema = z.object({
    castId: z.string().min(5).max(5),
    name: z.string().max(255),
    role: z.nativeEnum(CastRole),
    biolink: z.string().url()
});

export default CastSchema;
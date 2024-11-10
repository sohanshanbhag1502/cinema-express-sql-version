import { z } from 'zod';
import { Resolution } from '@prisma/client';

const ScreenSchema = z.object({
    screenId: z.string().min(5).max(5),
    theId: z.string().min(5).max(5),
    resolution: z.nativeEnum(Resolution)
});

export default ScreenSchema;
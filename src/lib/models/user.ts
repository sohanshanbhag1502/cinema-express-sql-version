import {z} from 'zod';

const UserSchema = z.object({
    userId: z.string().min(5, "Username should be minimum 5 characters")
    .max(255, "Username Can be max 255 characters"),
    name: z.string(),
    email: z.string().email(),
    phNum: z.string().min(10, "Phone number is invalid")
    .max(10, "Phone number is invalid"),
    dob: z.date(),
    passwd: z.string().min(8, "Password should be minimum 8 characters"),
    gender: z.enum(['Male', 'Female'])
});

export const UserLogin = z.object({
    userId: z.string().min(5, "Username should be minimum 5 characters")
    .max(255, "Username Can be max 255 characters"),
    passwd: z.string()
});

export default UserSchema;
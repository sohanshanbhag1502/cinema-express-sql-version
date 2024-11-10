import {z} from 'zod';

const AdminSchema = z.object({
    adminId: z.string().min(5, "Admin ID should be minimum 5 characters")
    .max(255, "Admin ID Can be max 255 characters"),
    name: z.string().min(5, "Name should be minimum 5 characters")
    .max(255, "Name Can be max 255 characters"),
    email: z.string().email(),
    passwd: z.string().min(8, "Password should be minimum 8 characters")
});

export const AdminLogin = z.object({
    adminId: z.string().min(5, "Invalid Admin Id"),
    passwd: z.string()
});

export default AdminSchema;
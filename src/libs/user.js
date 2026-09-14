import z from "zod";

const addressSchema = z.object({
  city: z.string(),
  province: z.string(),
  country: z.string().optional(),
});

const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  phone: z.string().min(6).max(13),
  address: addressSchema,
});

export { userSchema };
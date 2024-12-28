import {z} from 'zod'

export const locationSchema = z.object({
  address: z.string().min(10).max(250),
  longitude: z.number(),
  latitude: z.number(),
  description: z.string().min(10).max(250),
  images: z.array(z.object({
        key: z.string(),
        url: z.string(),
        name: z.string()})).nonempty({
          message: "Must upload at least one image.",
        })
})

"use server"

import { currentUser } from "@clerk/nextjs/server"
import prisma from "./db"

export const postLocation = async (data: any) => {
    const user = await currentUser()

    if(!user) {
        return {
            error: "Not authenticated.",
            status: 'ERROR'
        }
    }

    try {

        const postImages = data.images.map((image: any) => {
            return image.url
        })

        const location = await prisma.location.create({
            data: {
                address: data.address,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                images: postImages,        
            }
        })

        return {
            location,
            status: 'SUCCESS'
        }
    } catch (error) {
        console.log(`error occurred: ${error}`)
        return {
            error,
            status: 'ERROR'
        }   
    }
}
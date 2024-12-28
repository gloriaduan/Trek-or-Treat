"use server"

import { currentUser } from "@clerk/nextjs/server"

export const postLocation = async (data: object) => {
    const user = await currentUser()

    if(!user) {
        return {
            error: "Not authenticated.",
            status: 'ERROR'
        }
    }

    try {
        
    } catch (error) {
        
    }

    return {
        message: "Post location"
    }
}
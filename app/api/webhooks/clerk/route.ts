import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/users";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  // console.log('Webhook payload:', body)

  if (eventType == "user.created") {
    try {
      const { id, username, image_url } = evt.data;
      const newUser = {
        id,
        username: username ?? "",
        avatar: image_url,
        createdAt: new Date(),
      };

      const user = await createUser(newUser);

      return new Response(`New user created: ${user}`, { status: 200 });
    } catch (e) {
      return new Response(`Error has occurred: ${e}`, { status: 500 });
    }
  } else if (eventType == "user.updated") {
    try {
      const { id, username, image_url } = evt.data;
      const updatedUser = {
        username: username ?? undefined,
        avatar: image_url,
      };

      const user = await updateUser(id, updatedUser);
      return new Response(`User updated: ${user}`, { status: 200 });
    } catch (e) {
      return new Response(`Error has occurred: ${e}`, { status: 500 });
    }
  } else if (eventType == "user.deleted") {
    const user = await deleteUser(id);
    return new Response(`User deleted: ${user}`, { status: 200 });
  }

  return new Response("Webhook received", { status: 200 });
}

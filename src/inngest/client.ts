import { EventSchemas, Inngest } from "inngest";
import { Events } from "./functions";

// Create a client to send and receive events
export const inngest = new Inngest({ name: "ChatDocs",
schemas: new EventSchemas().fromRecord<Events>(),
});

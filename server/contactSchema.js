// contactSchema.js
import { mongoose } from "./db.js";

// Define schema
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },


        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
        },

        created_at: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
    },
    {
        collection: "contacts", // Optional: ensure collection name
    }
);

// Create model
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;

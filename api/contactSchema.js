import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError
export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);

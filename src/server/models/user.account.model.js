//@ts-check
import mongoose from "./../utils/mongoose";
import { paginate, toJSON } from "./plugins";

const { String } = mongoose.Schema.Types;

const userAccountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

userAccountSchema.index({ createdAt: 1 });
userAccountSchema.index({ updatedAt: 1 });

// add plugin that converts mongoose to json
userAccountSchema.plugin(toJSON);
userAccountSchema.plugin(paginate);

export default mongoose.models.userAccount || mongoose.model("userAccount", userAccountSchema);

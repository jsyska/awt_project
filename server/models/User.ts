import mongoose, { Model, Document } from "mongoose";

interface IUserBase extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    imagePath: string;
    followers: Array<string>;
    followings: Array<string>;
    country?: string;
    occupation?: string;
    createdAt?: Number;
    updatedAt?: Number;
}

export interface IUser extends IUserBase {
    password: string;
    toJSON(): IUserBase;
}

export interface IUserResponse extends IUserBase {
    token?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    imagePath: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    followings: {
        type: [String],
        default: [],
    },
    country: String,
    occupation: String
}, { timestamps: true });

const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
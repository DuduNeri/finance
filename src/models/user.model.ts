import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: {
    type: String,
    required: true,
    enum: ["user", "super_user"],
    default: "user"
  },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: false  } 
});

export default mongoose.model("User", UserSchema);

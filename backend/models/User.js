import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Името е задължително"],
      trim: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: [true, "Имейлът е задължителен"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Невалиден имейл адрес"],
    },
    password: {
      type: String,
      required: [true, "Паролата е задължителна"],
      minlength: 6,
      select: false, // никога не се връща по подразбиране в заявки
    },
  },
  { timestamps: true }
);

// Хешира паролата преди запис, само ако е била променена
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Инстанс метод за сравнение на парола при login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);

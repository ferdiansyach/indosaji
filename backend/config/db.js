import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://iyanferdiansyach30:192234230@cluster0.b3lbk5r.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};

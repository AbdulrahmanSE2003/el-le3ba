import mongoose from "mongoose";

export const generateCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export async function getGrowthStats(model: mongoose.Model<any>) {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [total, currentMonth, lastMonth] = await Promise.all([
    model.countDocuments(),
    model.countDocuments({
      createdAt: { $gte: startOfThisMonth },
    }),
    model.countDocuments({
      createdAt: {
        $gte: startOfLastMonth,
        $lt: startOfThisMonth,
      },
    }),
  ]);

  let change = 0;

  if (lastMonth === 0) {
    change = currentMonth > 0 ? 100 : 0;
  } else {
    change = Math.round(((currentMonth - lastMonth) / lastMonth) * 100);
  }

  return {
    total,
    change,
  };
}

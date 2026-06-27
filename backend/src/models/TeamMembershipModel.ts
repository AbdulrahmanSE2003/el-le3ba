import mongoose from "mongoose";

const teamMembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

  teamId: { type: mongoose.Schema.ObjectId, ref: "Team", required: true },

  role: { type: String, enum: ["captain", "member"], required: true },

  joinedAt: { type: Date, default: Date.now },
});

teamMembershipSchema.index({ userId: 1 });
teamMembershipSchema.index({ teamId: 1 });
teamMembershipSchema.index({ userId: 1, teamId: 1 }, { unique: true });

const TeamMembership = mongoose.model("TeamMembership", teamMembershipSchema);

export default TeamMembership;

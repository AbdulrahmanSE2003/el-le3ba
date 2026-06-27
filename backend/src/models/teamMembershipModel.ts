import mongoose, { Query } from "mongoose";

export interface ITeamMembership extends Document {
  userId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  role: "captain" | "member";
  joinedAt: Date;
}

const teamMembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

  teamId: { type: mongoose.Schema.ObjectId, ref: "Team", required: true },

  role: { type: String, enum: ["captain", "member"], required: true },

  joinedAt: { type: Date, default: Date.now },
});

teamMembershipSchema.index({ userId: 1 });
teamMembershipSchema.index({ teamId: 1 });
teamMembershipSchema.index({ userId: 1, teamId: 1 }, { unique: true });

teamMembershipSchema.pre(/^find/, function (this: Query<any, any>) {
  this.populate({
    path: "userId",
    select: "name email",
  }).populate({
    path: "teamId",
    select: "teamName",
  });
});

const TeamMembership = mongoose.model<ITeamMembership>(
  "TeamMembership",
  teamMembershipSchema,
);

export default TeamMembership;

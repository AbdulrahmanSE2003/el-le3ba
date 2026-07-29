import mongoose, { Document } from "mongoose";

export interface IAuditLog extends Document {
  actor: mongoose.Types.ObjectId;
  action: string;
  target?: mongoose.Types.ObjectId;
  targetModel?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    target: {
      type: mongoose.Schema.Types.ObjectId,
    },

    targetModel: {
      type: String,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

auditLogSchema.index({ actor: 1 });
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ action: 1 });

export default mongoose.model<IAuditLog>("AuditLog", auditLogSchema);

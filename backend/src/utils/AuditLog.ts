import { Types } from "mongoose";
import AuditLog from "../models/AuditLogModel";

interface IAuditLog {
  actor: Types.ObjectId | string;
  action: string;
  target?: Types.ObjectId | string;
  targetModel?: string;
  metadata?: Record<string, unknown>;
}

export const logAudit = async ({
  actor,
  action,
  target,
  targetModel,
  metadata,
}: IAuditLog) => {
  await AuditLog.create({
    actor,
    action,
    target,
    targetModel,
    metadata,
  });
};

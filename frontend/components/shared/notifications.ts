import { toast } from "sonner";

// Show success message
export function showSuccess(message: string) {
  toast.success(message, {
    duration: 5000,
    position: "bottom-right",
    closeButton: true,
    style: {
      backgroundColor: "#ECFDF5",
      color: "#065F46",
      border: "1px solid #34D399",
    },
  });
}

// Show error message
export function showError(message: string) {
  toast.error(message, {
    duration: 5000,
    position: "bottom-right",
    closeButton: true,
    style: {
      backgroundColor: "#ffe6e6",
      color: "#991B1B",
      border: "1px solid #EF4444",
    },
  });
}

// Show error message
export function showInfo(message: string) {
  toast.info(message, {
    duration: 5000,
    position: "bottom-right",
    closeButton: true,
    style: {
      backgroundColor: "#EFF6FF",
      color: "#1D4ED8",
      border: "1px solid #3B82F6",
    },
  });
}

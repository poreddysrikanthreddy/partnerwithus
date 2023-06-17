import React from "react";
import { ToastContainer, toast } from "react-toastify";
class Toast {
  static showError(message: string) {
    toast.error(message);
  }
  static showSuccess(message: string) {
    toast.success(message);
  }
}

export default Toast;

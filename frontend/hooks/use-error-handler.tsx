"use client";

import { toast } from "react-hot-toast";

export const useErrorHandler = () => {
  const handleError = (errors: any) => {
    if (!errors) return;

    // Kalau errors adalah string
    if (typeof errors === "string") {
      toast.error(errors);
      return;
    }

    // Kalau errors punya key 'message' dan itu string
    if (typeof errors.message === "string") {
      toast.error(errors.message);
      return;
    }

    // Kalau errors bentuknya object dan bisa di-loop
    if (typeof errors === "object") {
      Object.values(errors).forEach((val: any) => {
        if (typeof val === "string") {
          toast.error(val);
        } else if (typeof val === "object" && val !== null) {
          Object.values(val).forEach((nestedVal: any) => {
            if (typeof nestedVal === "string") {
              toast.error(nestedVal);
            }
          });
        }
      });
    }
  };

  return { handleError };
};

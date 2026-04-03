import axios from "axios";
import toast from "react-hot-toast";

export const handleError = (error: any) => {
  if (!axios.isAxiosError(error)) return;

  const err = error.response;

  if (Array.isArray(err?.data?.errors)) {
    err.data.errors.forEach((e: any) => toast.error(e.description));

  } else if (typeof err?.data?.errors === "object") {
    Object.values(err.data.errors).forEach((e: any) => toast.error(e[0]));

  } else if (err?.status && err?.status >= 400 && err?.status <= 499 ) {
    toast.error(err.data);

  } else if (err?.data) {
    toast.error(typeof err.data === "string" ? err.data : "An error occurred");

  } else {
    toast.error("Unexpected error occurred");
  }
};
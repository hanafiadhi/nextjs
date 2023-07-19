import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastMessageSuccess = (messagae: string) => {
  toast.success(messagae, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const FaildedMessage = (message: any) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
export const FaildedMessageOpenApi = (message: any) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

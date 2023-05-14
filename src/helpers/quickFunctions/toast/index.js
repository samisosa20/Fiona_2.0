import { toast } from "react-toastify"

const useToast = () => {
    const success = (msg, options = {}) => {
        return toast.success(msg, {
            // Merge additionals options
            ...options,
            className: "bg-success",
        })
    }

    const error = (msg, options = {}) => {
        return toast.error(msg, {
            ...options,
            className: "bg-danger text-white",
        })
    }
    const info = (msg, options = {}) =>{
        return toast.info(msg, {
            ...options,
            className: "bg-black",
        })
    }

    const warn = (msg, options = {}) => {
        return toast.warn(msg, {
            ...options,
            className: "bg-warning",
        })
    }

    return {
        success,
        error,
        info,
        warn,
    }
};
export default useToast;

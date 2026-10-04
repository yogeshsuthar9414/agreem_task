import Toast from "react-native-toast-message";

function toastNotify(msg: any, type: any) {
    Toast.show({
        type: type,
        text1: (type === "success" && "Success") || (type === "error" && "Error") || "",
        text2: msg,
    });
}

export default toastNotify;

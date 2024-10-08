import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadFile = async (file) => {
    
    //(tuc la upload cai anh len sau do no se tra cho minh duong dan, sau do minh se tra link do ve database ma ko phai tam anh nua)
    //luu cai file nay len firebase
    const storageRef = ref(storage, file.name);
    const response = await uploadBytes(storageRef, file);
    //lay cai duong dan den file vua tao.
    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
};
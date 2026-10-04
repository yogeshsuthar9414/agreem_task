import { Platform } from "react-native";
import {
    PERMISSIONS,
    RESULTS,
    request,
} from 'react-native-permissions';

export const requestGalleryPermission = async () => {
    let permission;

    if (Platform.OS === 'android') {
        // Android 13+
        permission =
            Platform.Version >= 33
                ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    } else {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
};
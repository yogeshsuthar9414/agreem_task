import { requestGalleryPermission } from "../../../services/permissions/Permsision";
import { launchImageLibrary } from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import { useEffect, useState } from "react";
import { Dimensions, PixelRatio, Platform } from "react-native";

export const useHome = () => {

    const [devicesData, setDevicesData] = useState<any>(null);

    // User Login
    const accessGellary = async () => {
        const allowed = await requestGalleryPermission();

        if (!allowed) {
            console.log('Gallery permission denied');
            return;
        }

        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        const image = result.assets?.[0];

        if (image) {
            console.log(image.uri);
        }
    };


    const getDeviceData = async () => {
        const { width, height } = Dimensions.get('screen');


        const [
            deviceName,
            uniqueId,
            totalMemory,
            freeDiskStorage,
            totalDiskCapacity,
            batteryLevel,
            isCharging,
            isEmulator,
        ] = await Promise.all([
            DeviceInfo.getDeviceName(),
            DeviceInfo.getUniqueId(),
            DeviceInfo.getTotalMemory(),
            DeviceInfo.getFreeDiskStorage(),
            DeviceInfo.getTotalDiskCapacity(),
            DeviceInfo.getBatteryLevel(),
            DeviceInfo.isBatteryCharging(),
            DeviceInfo.isEmulator(),
        ]);

        const data = {
            // Device
            device: {
                brand: DeviceInfo.getBrand(),
                manufacturer: await DeviceInfo.getManufacturer(),
                model: DeviceInfo.getModel(),
                deviceName,
                deviceId: DeviceInfo.getDeviceId(),
                uniqueId,
                type: DeviceInfo.getDeviceType(),
                isTablet: DeviceInfo.isTablet(),
                isEmulator,
            },

            // OS
            operatingSystem: {
                name: DeviceInfo.getSystemName(),
                version: DeviceInfo.getSystemVersion(),
                apiLevel:
                    Platform.OS === 'android'
                        ? await DeviceInfo.getApiLevel()
                        : null,
                platform: Platform.OS,
            },

            // Battery
            battery: {
                level: Math.round(batteryLevel * 100),
                isCharging,
            },

            // RAM
            memory: {
                totalBytes: totalMemory,
                totalMB: Math.round(totalMemory / 1024 / 1024),
                totalGB: (totalMemory / 1024 / 1024 / 1024).toFixed(2),
            },

            // Storage
            storage: {
                totalBytes: totalDiskCapacity,
                freeBytes: freeDiskStorage,

                totalGB: (
                    totalDiskCapacity /
                    1024 /
                    1024 /
                    1024
                ).toFixed(2),

                freeGB: (
                    freeDiskStorage /
                    1024 /
                    1024 /
                    1024
                ).toFixed(2),

                usedGB: (
                    (totalDiskCapacity - freeDiskStorage) /
                    1024 /
                    1024 /
                    1024
                ).toFixed(2),
                percentageFreeGB: (((freeDiskStorage / 1024 / 1024 / 1024) / (totalDiskCapacity / 1024 / 1024 / 1024)) * 100).toFixed(2),
                percentageUsedGB: ((((totalDiskCapacity - freeDiskStorage) / 1024 / 1024 / 1024) / (totalDiskCapacity / 1024 / 1024 / 1024)) * 100).toFixed(2)
            },

            // Display
            display: {
                width,
                height,
                density: PixelRatio.get(),
                fontScale: PixelRatio.getFontScale(),
                resolution: `${Math.round(width * PixelRatio.get())}x${Math.round(
                    height * PixelRatio.get(),
                )}`,
            },

            // App
            app: {
                version: DeviceInfo.getVersion(),
                buildNumber: DeviceInfo.getBuildNumber(),
                bundleId: DeviceInfo.getBundleId(),
            },
        };

        setDevicesData(data);
    };

    useEffect(() => {
        getDeviceData();
    }, []);


    return {
        accessGellary,
        devicesData
    };
};
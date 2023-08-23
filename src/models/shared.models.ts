export interface SharedDeviceDto {
    status: SHARED_DEVICE_STATUS;
    name: string;
    os: string;
    version: string;
    manufacturer: string;
    model: string;
    category: string;
    resolution: string;
    deviceHost: string;
    errorCode: string;
    details: string;
    clouds: string[];
    placementConstraints: string;
    deviceId: string;
}

export enum SHARED_DEVICE_STATUS {
    AVAILABLE = "AVAILABLE",
    OFFLINE = "OFFLINE",
    MAINTENANCE = "MAINTENANCE",
    CONFIGURED = "CONFIGURED",
    IN_USE = "IN_USE",
    DIRTY = "DIRTY",
    IN_RESET = "IN_RESET",
    DISCONNECTED = "DISCONNECTED",
    UNUSABLE = "UNUSABLE"
}
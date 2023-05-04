import { IAppSettingsData } from "./IAppsettingsData";
import * as appSettingsData from './appSettings.json';

export class AppSettings implements IAppSettingsData {
    private static instance: AppSettings;
    public CONFIG: {
        DATABASE_CONNECTION_STRING: string;
        STORAGE_CONNECTION_STRING: string,
        PORT_NUMBER: number,
        JWT_SECRET: string,
        ENVIRONMENT: string
    };


    constructor() {
        this.CONFIG = {
            DATABASE_CONNECTION_STRING: appSettingsData.CONFIG.DATABASE_CONNECTION_STRING,
            STORAGE_CONNECTION_STRING: appSettingsData.CONFIG.STORAGE_CONNECTION_STRING,
            PORT_NUMBER: appSettingsData.CONFIG.PORT_NUMBER,
            JWT_SECRET: appSettingsData.CONFIG.JWT_SECRET,
            ENVIRONMENT: appSettingsData.CONFIG.ENVIRONMENT
        }
    }

    public static getInstance(): AppSettings {
        if (!AppSettings.instance) {
            AppSettings.instance = new AppSettings();
        }
        return AppSettings.instance;
    }
}

export const _appSettings: IAppSettingsData = AppSettings.getInstance();

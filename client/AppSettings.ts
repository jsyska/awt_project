import { IAppSettingsData } from "./IAppsettingsData";
import * as appSettingsData from './appSettings.json';

export class AppSettings implements IAppSettingsData {
    private static instance: AppSettings;
    public CONFIG: {
        SERVER_RELATIVE_URL: string,
        ENVIRONMENT: string
    };


    constructor() {
        this.CONFIG = {
            SERVER_RELATIVE_URL: appSettingsData.CONFIG.SERVER_RELATIVE_URL,
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

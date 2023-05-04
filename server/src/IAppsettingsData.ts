export interface IAppSettingsData {
    CONFIG: {
        DATABASE_CONNECTION_STRING: string;
        STORAGE_CONNECTION_STRING: string;
        PORT_NUMBER: number;
        JWT_SECRET: string;
        ENVIRONMENT: string;
    }
}
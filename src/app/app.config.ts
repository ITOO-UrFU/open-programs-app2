import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export class IAppConfig {
    apiEndpoint: string;
};

export const AppConfig: IAppConfig = {
    apiEndpoint: 'http://10.16.208.154:8080/api/v11/'
};
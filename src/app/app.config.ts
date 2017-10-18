import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export class IAppConfig {
    apiEndpoint: string;
};

export const AppConfig: IAppConfig = {
     apiEndpoint: 'https://openedu.urfu.ru/oop/api/v11/'
}
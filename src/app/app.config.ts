import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export class IAppConfig {
    apiEndpoint: string;
};

export const AppConfig: IAppConfig = {
<<<<<<< HEAD
    apiEndpoint: 'https://openedu.urfu.ru/oop/api/v11/'
=======
     apiEndpoint: 'https://openedu.urfu.ru/oop/api/v11/'
     // apiEndpoint: 'http://212.193.94.145:8080/api/v11/'
>>>>>>> origin/global_refactoring
};
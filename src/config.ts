import { Injectable } from '@angular/core';

@Injectable()
export class Config {
}

export const webApi = {
    baseUrl: 'http://13.232.192.230:9845/',
    apiUrl: {
        /********************* Auth ********************/
        loginAdmin: 'api/reports/adminWeb/admin_user_login',
        getallUsers: 'api/reports/adminWeb/get_all_users',
        gettestUsers: 'api/reports/adminWeb/get_test_for_user',
        getworkoutsUsers: 'api/reports/adminWeb/get_workouts_for_user',
    },
};

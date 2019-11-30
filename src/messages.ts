import { Injectable } from '@angular/core';

@Injectable()
export class messages {
}

export const msg = {
    loginsuc: 'Login Successful !',
    loginerror: 'Login Error !',
    severerror: 'Server Error !',
    invalidUP: 'Invalid Username or Password',
    requiredUP: 'Username and Password is required'
};

import { Injectable } from '@angular/core';

@Injectable() 
export class IsLoginService {
	isLoggedIn(): Promise<string> {
		if(typeof (Storage)!== undefined) {
			if(sessionStorage.getItem('role')) {
				return Promise.resolve(sessionStorage);
			}
		}
		return Promise.resolve(sessionStorage);
	}
}
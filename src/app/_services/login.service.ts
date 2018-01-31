import { Injectable } from '@angular/core';

@Injectable() 
export class IsLoginService {
	isLoggedIn(): Promise<string> {
		if(typeof (Storage)!== undefined) {
			if(localStorage.getItem('role')) {
				return Promise.resolve(localStorage);
			}
		}
		return Promise.resolve(localStorage);
	}
}
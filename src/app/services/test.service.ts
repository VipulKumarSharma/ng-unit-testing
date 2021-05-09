import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    isLoggedIn = true;
    user = { name: 'Test User' };
    testQuote = 'Test Quote';

    constructor() { }

    getQuote(): Observable<string> {
        return of(this.testQuote);
    }
}

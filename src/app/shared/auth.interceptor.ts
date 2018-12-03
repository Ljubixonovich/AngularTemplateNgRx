import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take, switchMap} from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        // ovako setujes request
        // const copiedReq = req.clone({headers: req.headers.set('','')});

        // ovako postavis token na klonirani request i tako ga saljes      
        return this.store.select('auth')
        // take(1) znaci samo jednom okini observable (jer bi se inace stalno okidala kad se promeni)
            .pipe(
                take(1), 
                switchMap((authState: fromAuth.State) => {
                    const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
                    return next.handle(copiedReq);
                })
            );      
    }

}
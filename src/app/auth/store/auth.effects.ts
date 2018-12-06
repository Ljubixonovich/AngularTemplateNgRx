import { Injectable } from '@angular/core';  
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, tap, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Action} from '@ngrx/store';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router, private toastr: ToastrService ) {}

    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }), 
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData. password))
                    .pipe(
                        catchError((error)=> {
                            this.toastr.error(error, '', {timeOut: 3000});                                 
                            return of();
                        })
                    )
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                this.toastr.info('Successfully registered', '', {timeOut: 2000});
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

        
    @Effect()
    authSignin: Observable<Action> = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(
            map((action: AuthActions.TrySignin) => {
                return action.payload;
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
                    .pipe(
                        catchError((error)=> {
                            this.toastr.error(error, '', {timeOut: 3000});                                 
                            return of();
                        })
                    )
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());                
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']); 
                this.toastr.info('Loged in', '', {timeOut: 1000});        
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );


    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(
            tap(() => {
                this.router.navigate(['/']);
                this.toastr.warning('Loged out', '');
            })
        );

}
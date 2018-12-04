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
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData. password));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
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


        // @Effect()
        // search$: Observable<Action> = this.actions$
        //   .ofType(book.SEARCH)
        //   .debounceTime(300)
        //   .map(toPayload)
        //   .switchMap(query => {
        //     if (query === '') {
        //       return empty();
        //     }
      
        //     const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);
      
        //     return this.googleBooks.searchBooks(query)
        //       .takeUntil(nextSearch$)
        //       .map(books => new book.SearchCompleteAction(books))
        //       .catch(() => of(new book.SearchCompleteAction([])));
        //   });


    @Effect()
    authSignin2: Observable<Action> = this.actions$
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
                console.log('token iz effect',token);
                this.router.navigate(['/']);                
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




    // @Effect()
    // authSignin: Observable<any> = this.actions$
    //     .ofType(AuthActions.TRY_SIGNIN)
    //     .pipe(
    //         map((action: AuthActions.TrySignin) => {
    //             return action.payload;
    //         }),
    //         switchMap((authData: {username: string, password: string}) => {
    //             return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    //         }),
    //         switchMap(() => {
    //             return from(firebase.auth().currentUser.getIdToken());                
    //         }),
    //         mergeMap((token: string) => {
    //             this.router.navigate(['/']);                
    //             return [
    //                 {
    //                     type: AuthActions.SIGNIN
    //                 },
    //                 {
    //                     type: AuthActions.SET_TOKEN,
    //                     payload: token
    //                 }
    //             ];
    //         }),
    //     );


    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(
            tap(() => {
                this.router.navigate(['/']);
            })
        );

}
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take, finalize } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { API_URL } from "../../globals";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Skip authentication for auth endpoints
        if (req.url.startsWith(API_URL + "/auth/")) {
            return next.handle(req);
        }
        
        // Add token to all other requests
        const token = this.authService.getAccessToken();
        const modifiedRequest = this.addTokenToRequest(req, token);
        
        return next.handle(modifiedRequest).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    console.clear();
                    return this.handle401Error(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addTokenToRequest(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token || ''}`,
            }
        });
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((tokenResponse: any) => {
                    // Store the new tokens
                    this.authService.setAccessToken(tokenResponse.accessToken);

                    this.refreshTokenSubject.next(tokenResponse.accessToken);
                    
                    // Retry the original request with new token
                    return next.handle(this.addTokenToRequest(req, tokenResponse.accessToken));
                }),
                catchError(err => {
                    this.authService.logout();
                    return throwError(() => err);
                }),
                finalize(() => {
                    this.isRefreshing = false;
                })
            );
        } else {
            // Wait for the token refresh to complete
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addTokenToRequest(req, token));
                })
            );
        }
    }
}
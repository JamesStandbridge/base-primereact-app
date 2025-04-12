/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { Token } from '../models/Token';
import type { UserInDB } from '../models/UserInDB';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Login For Access Token
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenApiOptiboisV1AuthTokenPost({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/optibois/v1/auth/token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Users Me
     * @returns UserInDB Successful Response
     * @throws ApiError
     */
    public static readUsersMeApiOptiboisV1AuthUsersMeGet(): CancelablePromise<UserInDB> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/optibois/v1/auth/users/me',
        });
    }
}

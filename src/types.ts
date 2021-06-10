import {arrayBufferToBase64, uint8ArrayToBase64} from "./utils";

export interface GetSecretResponse {
    salt: string,
    iv: string,
    secret: string,
}
export interface GetSecretRequest {
    keyId: string;
    searchKey: string;
}
export interface SetSecretRequest {
    id: string,
    secret: string,
    salt: string,
    iv: string,
    searchKey: string,
}

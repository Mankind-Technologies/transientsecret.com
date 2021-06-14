import {arrayBufferToBase64, base64ToArrayBuffer, base64ToUint8Array, uint8ArrayToBase64} from "./utils";
import {GetSecretRequest, GetSecretResponse, SetSecretRequest} from "./types";

const iters = 100000;

export const importKey = async (key:string) => {
    return window.crypto.subtle.importKey(
        "raw",
        (new TextEncoder().encode(key)),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
}

const deriveHash = (key:CryptoKey, salt:Uint8Array, iterations:number ) => window.crypto.subtle.deriveBits(
    {
        "name": "PBKDF2",
        salt: salt,
        "iterations": iterations,
        "hash": "SHA-256"
    },
    key,
    256
);
const deriveKey = (key:CryptoKey, salt:Uint8Array, iterations:number ) => window.crypto.subtle.deriveKey(
    {
        "name": "PBKDF2",
        salt: salt,
        "iterations": iterations,
        "hash": "SHA-256"
    },
    key,
    { "name": "AES-GCM", "length": 256},
    true,
    [ "encrypt", "decrypt" ]
);
export const aesDecrypt = (key:CryptoKey, iv:Uint8Array, data:ArrayBuffer) => window.crypto.subtle.decrypt(
    {
        name: "AES-GCM",
        iv: iv
    },
    key,
    data
);
export const aesEncrypt = (key:CryptoKey, iv:Uint8Array, secret:string) => window.crypto.subtle.encrypt(
    {
        name: "AES-GCM",
        iv: iv
    },
    key,
    (new TextEncoder()).encode(secret)
);
export interface StoreSecretData {
    saltId: string,
    searchKey: string,
}
export const storeSecret = async (secret:string, password:string):Promise<StoreSecretData> => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await importKey(password);
    const saltId = window.crypto.getRandomValues(new Uint8Array(16));
    const searchKey = window.crypto.getRandomValues(new Uint8Array(16));
    const keyId = await deriveHash(passwordKey, saltId, iters);
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const secretKey = await deriveKey(passwordKey, salt, iters);
    const secretEncrypted = await aesEncrypt(secretKey, iv, secret);
    const request:SetSecretRequest = {
        id: arrayBufferToBase64(keyId),
        secret: arrayBufferToBase64(secretEncrypted),
        salt: uint8ArrayToBase64(salt),
        iv: uint8ArrayToBase64(iv),
        searchKey: uint8ArrayToBase64(searchKey),
    };
    const response = await fetch('/api/secret',{
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return {
        saltId: uint8ArrayToBase64(saltId),
        searchKey: uint8ArrayToBase64(searchKey),
    };
}
export const retrieveSecret = async (saltIdString:string, searchKey:string, password:string) => {
    const saltId = base64ToUint8Array(saltIdString);
    const passwordKey = await importKey(password);
    const id = await deriveHash(passwordKey, saltId, iters);
    const request:GetSecretRequest = {
        keyId: arrayBufferToBase64(id),
        searchKey,
    }
    const response:GetSecretResponse = await fetch('/api/secret',{
        method: 'DELETE',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(x => x.json());
    const secretKey = await deriveKey(passwordKey, base64ToUint8Array(response.salt), iters);
    const secretEncrypted = await aesDecrypt(secretKey, base64ToUint8Array(response.iv), base64ToArrayBuffer(response.secret));
    return (new TextDecoder()).decode(secretEncrypted);
}


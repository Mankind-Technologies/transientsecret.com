# Why is transientsecret.com secure?

Secrets are encrypted and decrypted in the browser, i.e. the encryption is end-to-end.
Also, a proof is sent to the backend that is able to decide if the requester knows the 
password. If the proof matches then the encrypted secret is sent for decryption in frontend.
Anyhow, the data is deleted from the backend at any attempt (given the proof successful or not).
Therefore, a sharing link only allows one attempt, disabling possible brute force attacks on 
leaked links.

## Encrypt

The process of encrypting is as follows:
1. `secret` and `key` are the inputs
2. A random byte array is generated named `saltId` and with the `key` used to generate the `keyId` 
with PBKDF2. This `keyId` will be stored in the backend, the `saltId` is stored in the sharing url.
3. A random byte array is generated named `searchKey` and stored as is in the backend
  and in the sharing url.
4. A random byte array is generated named `salt` and used with the `key` to generate 
the `secretKey` with PBKDF2. The `salt` will be stored in the backend.
5. `secretKey` is used to encrypt the `secret` with AES resulting in `secretEncrypted` that
is stored in the backend. Also, this step generates `iv` that is also stored in the backend.
6. Then `keyId`, `searchKey`, `salt`, `iv` and `secretEncrypted` are sent to the backend
and stored as base64 strings.
7. Then a url is generated with `searchKey` and `saltId`

This process until step 6 happens in the file `src/crypto.ts` function `storeSecret`.

## Decrypt

The process of decryption is as follows:
1. The user opens the url containing `searchKey` and `saltId`
2. The user is prompted to input the `key`
3. The `key` and the `saltId` are used to generate the `keyId` as in encryption step 2
4. The `searchKey` and `keyId` are sent to the backend to request the download of the
stored data
5. The backend searches for a row with the same `searchKey`, if found the row is deleted.
Then the `keyId` of the row is checked against the given `keyId`, the data is returned on match.
Otherwise, a `404` is returned.
6. If the result wasn't a `404` then the `salt`, `iv` and `secretEncrypted` are used
to revert the steps 4 and 5 of the encryption process, generating the original `secret`.

This process happens in the file `src/crypto.ts` function `retrieveSecret`, and the backend
logic of step 5 is located in `pages/api/secret.ts`.

## Where is the data?

Data stored in the backend:
- `keyId`, derived from the `saltId` and `key` 
- `searchKey`, a random byte array
- `secretEncrypted`, the secret encrypted
- `salt`, a random byte array used to generate `secretKey` to encrypt the `secret`
- `iv`, a random byte array used to run AES

Data stored in the sharing url:
- `searchKey`, a random byte array
- `saltId`, a random byte array used to generate `keyId`

The data stored in the sharing url is stored in the URI fragment, also known as
  hash, therefore it is not sent to the server. (Thanks [wormhole.app](https://wormhole.app/security) for the inspiration)

Data not stored anywhere:
- `key` the user's input key
- `secret` the user's secret



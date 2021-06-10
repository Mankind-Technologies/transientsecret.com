
export function base64ToArrayBuffer(base64:string):ArrayBuffer {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
export function base64ToUint8Array(base64:string) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}
export function uint8ArrayToBase64(array:Uint8Array):string {
    const output = [];
    for (let i = 0, length = array.length; i < length; i++) {
        output.push( String.fromCharCode.apply(null, [array[i]]));
    }
    return btoa(output.join(''));
}
export function arrayBufferToBase64( buffer:ArrayBuffer ):string {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}

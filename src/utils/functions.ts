import { diccionary } from "./diccionary";

export function capitalizeFirstLetter(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function generateSecurePassword(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((x) => chars[x % chars.length])
        .join("");
}

export function translate(rawWord: string){

    const word = rawWord.toLowerCase().trim();

    const result = diccionary[word];
    return result ?? word;
}
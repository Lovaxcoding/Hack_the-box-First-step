
const fs = require("fs");
const crypto = require("crypto");

const source = fs.readFileSync("app.js", "utf8");

// Extraction de la clé AES
const keyMatch = source.match(
  /importKey\s*\(\s*["']raw["']\s*,\s*_0x39b581\s*\(\s*["']([^"']+)["']\s*\)/s
);

// Extraction de l'IV
const ivMatch = source.match(
  /["']iv["']\s*:\s*_0x39b581\s*\(\s*["']([^"']+)["']\s*\)/s
);

// Extraction du ciphertext
const decryptMatch = source.match(
  /subtle\.decrypt\s*\([\s\S]*?_0x39b581\s*\(\s*["']([^"']+)["']\s*\)/s
);

if (!keyMatch || !ivMatch || !decryptMatch) {
  console.log("Taille du fichier :", source.length);
  console.log("ImportKey trouvé :", !!keyMatch);
  console.log("IV trouvé :", !!ivMatch);
  console.log("Ciphertext trouvé :", !!decryptMatch);
  throw new Error("Extraction incomplète.");
}

const key = Buffer.from(keyMatch[1], "base64");
const iv = Buffer.from(ivMatch[1], "base64");
const encrypted = Buffer.from(decryptMatch[1], "base64");

console.log("Clé :", key.length, "octets");
console.log("IV :", iv.length, "octets");
console.log("Ciphertext :", encrypted.length, "octets");

if (key.length !== 32 || iv.length !== 12 || encrypted.length <= 16) {
  throw new Error("Dimensions AES-GCM inattendues.");
}

// Les 16 derniers octets correspondent au tag GCM
const ciphertext = encrypted.subarray(0, -16);
const authTag = encrypted.subarray(-16);

const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
decipher.setAuthTag(authTag);

const decrypted = Buffer.concat([
  decipher.update(ciphertext),
  decipher.final()
]);

fs.writeFileSync("app.dec.js", decrypted);

console.log("Déchiffrement réussi : app.dec.js");

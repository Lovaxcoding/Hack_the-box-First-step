
import base64
from pathlib import Path
from Crypto.Cipher import AES

KEY = "C+XDTUB0EuPY7BE+xzRcMP6dNjWd0h0GPxdt8tWSTVY="

# Lire et décoder le fichier
raw = base64.b64decode(
    Path("app.enc").read_text().strip()
)

# Séparer nonce et ciphertext
iv = raw[:12]
ciphertext = raw[12:]

# Décoder la clé
key = base64.b64decode(KEY)

# Déchiffrement AES-GCM
cipher = AES.new(key, AES.MODE_GCM, nonce=iv)

# Le tag GCM se trouve à la fin (16 octets)
encrypted_data = ciphertext[:-16]
tag = ciphertext[-16:]

plaintext = cipher.decrypt_and_verify(encrypted_data, tag)

# Sauvegarder le JavaScript obtenu
Path("app.js").write_bytes(plaintext)

print("Déchiffrement réussi !")
print("Taille :", len(plaintext), "octets")
print(plaintext[:500].decode("utf-8", errors="replace"))

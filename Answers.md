1. What is the purpose of using sessions?

#### `Sessions are used to persist data across requests. Each client that is used to login to an account will have a session stored on the server. When that client makes another request to the server, if the session is still active, the user will not need to re-authenticate, and the server will handle the request.`

1. What does bcrypt do to help us store passwords in a secure manner.

#### `bcrypt hashes the password before it gets stored on the database.`

1. What does bcrypt do to slow down attackers?

#### `bcrypt adds time into their algorithm so that it takes more time to hash a password. When an attacker is trying a brute-force attack, each one of their attempted passwords will now take much longer to 'attempt', thus exponentially slowing down the attack to the point where it is probably not worth the attackers time.`

1. What are the three parts of the JSON Web Token?

#### `The three parts of a JSON Web Token are: the header, the payload, and the signature. The header contains the algorithm and the token type. The payload contains any information that we want stored on the token, such as username, userid, or any other piece of information that might be needed. Sentative information is NEVER put into the token, as the token itself is not private. The signature is a base64 encoded string that combines the header and payload, it is then 'signed' with the secret.`

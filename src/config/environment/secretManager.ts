const fs = require('fs');

const swarmSecretFolder = '/run/secrets'
var secretMap: Map<String, String>;

// function readSecret(secretName: String): String | undefined {
//     if (secretMap === undefined) {
//         secretMap = new Map();
//         realReadSecret();
//     }

//     return secretMap.get(secretName);
// };

function realReadSecret() {
    try {
        fs.readdirSync(swarmSecretFolder).forEach(file => {
            let secretValue = fs.readFileSync(`${swarmSecretFolder}/${file}`, 'utf8');
            secretMap.set(file, secretValue);
        });
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.log(`Err reading secret: ${err}`);
        } else {
            console.log(`Could not find the secret, probably not running in swarm mode ${err}`);
        }
    }
}

// module.exports = {
//     readSecret
// };
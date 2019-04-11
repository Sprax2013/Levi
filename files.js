initStorage();

module.exports.mkdirs = mkdirs;
module.exports.cfg = require('./storage/config.json');


/* Functions */
function initStorage() {
    if (!fs.existsSync('./storage/')) {
        mkdirs('./storage/');
    }

    if (!fs.existsSync('./storage/config.json')) {
        fs.writeFileSync('./storage/config.json', JSON.stringify({
            Token: 'Insert-Discord-Bot-Token'
        }, null, 4));
    }
}

function mkdirs(dirPath, callback) {
    if (typeof dirPath === 'function') {
        dirPath = dirPath();
    }

    dirPath = path.resolve(dirPath);

    try {
        if (!fs.existsSync(dirPath)) {
            var tempPath;

            dirPath.split(/[/\\]/).forEach((dirName) => {
                tempPath ? tempPath = path.join(tempPath, dirName) : tempPath = dirName;

                if (!fs.existsSync(tempPath)) {
                    fs.mkdirSync(tempPath);
                }
            });
        }

        if (callback) {
            callback();
        }

        return true;
    } catch (err) {
        if (callback) {
            callback(err);
        }

        return false;
    }
}
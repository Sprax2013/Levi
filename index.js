const classes = require('./Classes');

if (require('./Files').cfg['BotToken'] === 'Discord-Bot-Token') {
    console.log('Please provide a Bot-Token (./storage/config.json)');
    process.exit(1);
} else {
    require('./Bot');
}
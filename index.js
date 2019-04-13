if (require('./files').cfg['BotToken'] === 'Discord-Bot-Token') {
    console.log('Please provide a Bot-Token (./storage/config.json)');
    process.exit(1);
} else {
    require('./bot').init();
}
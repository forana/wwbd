var prompt = require("prompt");

prompt.message = "?".cyan;
prompt.delimiter = "";

prompt.start();

module.exports.text = function(callback) {
    prompt.get([
        {
            name: "answer",
            description: ":".cyan,
        }
    ], callback);
};

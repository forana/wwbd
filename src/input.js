var prompt = require("prompt");
var sync = require("synchronize");

prompt.message = "?".cyan;
prompt.delimiter = "";

prompt.start();

module.exports.text = function(text) {
    console.log(text.green);
    return sync.await(
        prompt.get([
            {
                name: "answer",
                description: ":".cyan,
            }
        ], sync.defer())
    )["answer"].yellow;
};

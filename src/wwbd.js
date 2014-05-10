var sync = require("synchronize");
var input = require("./input");
var babynames = require("./babynames");
require("colors");
require("string-format");

sync.fiber(function() {
    console.log("You are the captain of a small spaceship, charged with the mission of exploring space and finding new things and generally having a good time.");
    var shipName = input.text("What is the ship's name?");
    var crew = [babynames.get(), babynames.get(), babynames.get()];
    console.log("Your first mate's name is Bob, and your crew's names are {0.0}, {0.1}, and {0.2}.".format(crew));
    console.log("TODO implement more game".red);
});

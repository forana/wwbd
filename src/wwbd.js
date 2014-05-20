var _ = require("lodash");
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;
var input = require("./input");
var game = require("./game");
var babynames = require("./babynames");
var pkg = require("../package.json");
require("colors");

if (process.argv[2]) {
    console.log("version " + pkg.version);
    console.log("written by Alex Foran (http://alexforan.com/)");
} else {
    console.log("You are a mild-mannered office professional, returning from a business conference.");
    console.log("Your coworker, " + "Bob".yellow + ", came along with you. You don't like Bob. Bob doesn't like you. It has not been a good trip, and you'd like to get home and away from Bob."); 
    console.log(sprintf("On the flight back, your plane, flight %d, crashed abruptly somewhere in the middle of nowhere in the midwestern United States.", _.random(100, 999)));
    var crew = [babynames.get(), babynames.get(), babynames.get()];
    var yellowCrew = _.map(crew, function(i) { return i.yellow; });
    crew.push("Bob");
    crew.push("You");
    var party = {};
    crew.forEach(function(member) {
        party[member.toLowerCase()] = {
            name: member,
            hunger: 80,
            loyalty: member == "Bob" ? 30 : 70,
            fear: 20,
            sanity: 90
        };
    });
    game.init(party);
    console.log(vsprintf("You survived, of course, and so did Bob. Only three others survived - their names %s, %s, and %s - office professionals like yourself.", yellowCrew));
    console.log("Nearly immediately after landing and determining that you five were the only survivors, the five of you realized that the plane's wreckage was fully on fire - including any food, or any of your luggage. None of you know exactly where you are, and none of you managed to grab your phones before crawling out.");
    console.log("Thankfully, none of you were seriously injured. But you're office drones - you don't know a thing about survival.");
    console.log("The party held a vote - you're the leader, tasked with getting everyone home.");
    console.log("Bob didn't vote for you. Bob thinks he can do better.");
    console.log("Good luck.".green);

    var loop = function() {
        input.text(function(err, result) {
            if (err) {
                console.log(("" + err).red);
            } else {
                response = game.parse(result.answer);
                console.log(response.message.green);
                if (response.gameOver) {
                    console.log("Game Over".red);
                } else {
                    process.nextTick(loop);
                }
            }
        });
    };
    loop();
}

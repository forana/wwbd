var _ = require("lodash");
var sprintf = require("sprintf-js").sprintf;

var game = (function() {
    this.party = {};

    this.init = function(party) {
        this.party = party;
    };

    this.parse = function(command, actor) {
        if (!actor) {
            actor = this.party.you;
        }

        for (var i=0; i<commands.length; i++) {
            var entry = commands[i];
            for (var j=0; j<entry.patterns.length; j++) {
                var pattern = entry.patterns[j];
                var result = pattern.exec(command);
                if (result != null) {
                    result.push(actor);
                    return entry.process.apply(entry, result);
                }
            }
        };
        
        return {error: true, message: sprintf("%s %s know how to do that.", actor.name,
            actor == this.party.you ? "don't" : "doesn't")};
    };
    return this;
})();
module.exports = game;

var commands = [
    {
        patterns: [
            /^tell (\S+) to (.+)$/i,
            /^tell (\S+) (.+)$/i
        ],
        process: function(cmd, actorName, command) {
            var actor = game.party[actorName.toLowerCase()];
            if (!actor) {
                return {error: true, message: "There's nobody in your party with that name."};
            } else {
                return game.parse(command, actor);
            }
        }
    },
    {
        patterns: [
            /^die$/i,
            /^quit$/i
        ],
        process: function(cmd, actor) {
            if (actor != game.party.you) {
                return {message: "You can't just ask somebody to do that."};
            } else {
                return {message: "You've had enough.", gameOver: true};
            }
        }
    },
    {
        patterns: [
            /^s?he's (.*)$/i
        ],
        process: function(cmd, phrase, actor) {
            if (actor == game.party.you) {
                return {message: "You think to yourself for a bit."};
            } else {
                return {message: "You whisper \"You're " + phrase + ".\" to " + actor.name + ". Either they didn't hear you, or they're pretending not to."}
            }
        }
    },
    {
        patterns: [
            /^s?he (.*)$/i
        ],
        process: function(cmd, phrase, actor) {
            if (actor == game.party.you) {
                return {message: "You think to yourself for a bit."};
            } else {
                return {message: "\"" + actor.name + " " + phrase + ",\" you say out loud. Nobody responds."}
            }
        }
    },
    {
        patterns: [/^look around$/i, /^check area$/i, /^search$/i, /^look$/i],
        process: function(cmd, actor) {
            return {message: "Nothing but trees here."};
        }
    }
];

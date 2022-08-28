var filterlist = ["fuck", "jackass", "dumb", "dumbass", "dumbfuck", "bitch", "pussy", "shit", "shitty", "motherfucker", "mf", "dick", "balls", "faggot", "suck", "asshole", "penis", "cunt", "whore", "ass", "bitchass", "sex", "shitstick", "bitches", "prick", "cock", "sucker", "dipshit", "fucked", "shithead", "anal"];

module.exports = function filter(content) {
    content = content.replace("<@972716081837932574>", "");
    content = content.toLowerCase();
    for (var i = 0; i < filterlist.length; i++) {
        content = content.replaceAll(filterlist[i], "")
    }
    content = content.replace(/\s+/g, " ");
    content = content.trim();
    content = content + " ";
    return content;
}
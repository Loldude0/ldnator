module.exports = function getUsername(jsonlist, username) {
    var toret = false;
    for (var i = 0; i < jsonlist.length; i++) {
        if (jsonlist[i] === username) {
            toret = true;
        }
    }
    return toret;
}
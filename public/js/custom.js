"use strict";

/***********************************************************
 *
 * Use Tags to Filter Blog-Post List
 * (borrowed from Marijn Havebeke:  http://marijnhaverbeke.nl/blog)
 *
 ***********************************************************/

function getTags() {
    var tags = document.location.hash.slice(1).split(",");
    if (!tags[0].length) tags.pop();
    /* the following converts %20 to space, in each tag */
    return tags.map(decodeURI);
}

function filterList() {
    var tags = getTags();
    var posts = document.body.getElementsByClassName("post");
    for (var i = 0; i < posts.length; ++i) {
        var post = posts[i],
            visible = true;
        var ptags = post.getAttribute("data-tags").split(",");
        for (var j = 0; j < tags.length; ++j) {
            if (ptags.indexOf(tags[j]) == -1) {
                visible = false;
            }
        }post.style.display = visible ? "" : "none";
    }
    var tagElts = document.body.getElementsByClassName("tag");
    for (var _i = 0; _i < tagElts.length; ++_i) {
        var elt = tagElts[_i];
        elt.className = "tag" + (tags.indexOf(elt.textContent) > -1 ? " selected" : "");
    }
}

function filterTag(tag) {
    var tags = getTags();
    var known = tags.indexOf(tag);
    if (known == -1) {
        tags.push(tag);
    } else {
        tags.splice(known, 1);
    }
    document.location.hash = tags.length ? "#" + tags.join(",") : "";
}

window.addEventListener('load', filterList);
window.addEventListener('hashchange', filterList);
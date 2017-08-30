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

/***********************************************************
 *
 * Random Quotes
 *
 ***********************************************************/

function randomQuotes() {

    // utility
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //development
    var url = "data/quotes.json";

    // define the callback:
    function callback(response, error) {
        if (response !== null) {
            processData(response);
        } else {
            console.log(error);
        }
    }

    // handling the response text
    function processData(json) {
        var quotes = JSON.parse(json);
        var randomIndex = getRandomInt(0, quotes.length - 1);
        var quote = quotes[randomIndex].quote;
        var author = quotes[randomIndex].author;
        var block = document.querySelector("blockquote");
        var quoteText = document.createTextNode(quote);
        block.appendChild(quoteText);
        block.appendChild(document.createElement("br"));
        var authorLine = document.createElement("span");
        authorLine.setAttribute("class", "quote-author");
        authorLine.innerHTML = "&mdash; <em>" + author + "</em>";
        block.appendChild(authorLine);
    }

    //set it up
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    // timeout after 30 seconds:
    req.timeout = 30000;
    req.ontimeout = function () {
        console.log("Request timed out.");
    };

    // handle response to request:
    req.addEventListener("load", function () {
        if (req.status < 400) {
            callback(req.responseText);
        } else {
            callback(null, new Error(req.status + ":  " + req.statusText));
        }
    });

    // if we never get off the ground:
    req.addEventListener("error", function () {
        callback(null, new Error("Network error"));
    });

    // Now send it:
    req.send();
}

window.addEventListener('load', randomQuotes);
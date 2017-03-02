/***********************************************************
 *
 * Use Tags to Filter Blog-Post List
 * (borrowed from Marijn Havebeke:  http://marijnhaverbeke.nl/blog)
 *
 ***********************************************************/

function getTags() {
    const tags = document.location.hash.slice(1).split(",");
    if (!tags[0].length) tags.pop();
    /* the following converts %20 to space, in each tag */
    return tags.map(decodeURI);
}

function filterList() {
    const tags = getTags();
    const posts = document.body.getElementsByClassName("post");
    for (let i = 0; i < posts.length; ++i) {
        let post = posts[i], visible = true;
        let ptags = post.getAttribute("data-tags").split(",");
        for (let j = 0; j < tags.length; ++j)
            if (ptags.indexOf(tags[j]) == -1) {
                visible = false;
            }
        post.style.display = visible ? "" : "none";
    }
    const tagElts = document.body.getElementsByClassName("tag");
    for (let i = 0; i < tagElts.length; ++i) {
        let elt = tagElts[i];
        elt.className = "tag" + (tags.indexOf(elt.textContent) > -1 ? " selected" : "");
    }
}


function filterTag(tag) {
    const tags = getTags();
    const known = tags.indexOf(tag);
    if (known == -1) {
        tags.push(tag);
    }
    else {
        tags.splice(known, 1);
    }
    document.location.hash = tags.length ? "#" + tags.join(",") : "";
}

window.addEventListener('load', filterList);
window.addEventListener('hashchange', filterList);
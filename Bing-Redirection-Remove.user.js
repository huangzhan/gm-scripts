// ==UserScript==
// @name         Bing Redirection Remove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Just remove redirection from Bing search results
// @author       Huang Zhan
// @match        *://*.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// @include      *://*.bing.com/*
// ==/UserScript==

(function() {
    'use strict';

    const res = document.querySelector("ol#b_results");
    if (res) {
    for (var i = 0; i < res.childElementCount; i++) {
        const curNode = res.childNodes[i];
        var anodes = curNode.querySelectorAll("a");
        var j;
        for (j=0; j<anodes.length; j++) {
            var anode = anodes[j];
            if (anode.href) {
                var url = new URL(anode.href);
                if (url.pathname == "/ck/a") {
                    var u = url.searchParams.get("u").slice(2).replace(/-/g, '+').replace(/_/g, '/');
                    var nurl = atob(u);
                    if (nurl) {
                        anode.href = nurl;
                    }
                }
            }
        }
    }
    }
})();
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var openNav = false;
function openCloseNav() {
    if (width < 600) {
        if (openNav == false) {


            document.getElementById("mySidenav").style.height = "250px";
            document.getElementById("main-div").style.marginTop = "250px";
            document.getElementById("main").style.marginTop = "-250px";
            document.getElementById("mySidenav").style.display = "block";


            openNav = true;

        }

        else {
            document.getElementById("mySidenav").style.height = "0";
            document.getElementById("main-div").style.marginTop = "0";

            document.getElementById("main").style.marginTop = "0";

            document.getElementById("mySidenav").style.display = "none";
            openNav = false;
        }
    }

    else {
        if (openNav == false) {


            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main-div").style.marginLeft = "250px";
            document.getElementById("main").style.marginLeft = "250px";

            openNav = true;

        }

        else {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main-div").style.marginLeft = "0";
            document.getElementById("main").style.marginLeft = "0";

            openNav = false;
        }
    }

}



$(function () {

    /* build and append preformated code examples */
    $("div#content").find("p").last().after(buildCodeBlocks);

    /* toggle/collapse preformated code blocks */
    $("pre").bind("click", function () {
        this.className = this.className.indexOf("collapse") === -1 ?
            ( "collapse " + this.className ) : this.className.replace("collapse ", "");
    });

    /* apply code highlight */
    $('pre code').each(function (i, e) {
        hljs.highlightBlock(e, '    ');
    });


// $('.card').hover(function() {
//     // $('.').css('width', '35%');
//     var currentID = this.getAttribute("data-id");
//     document.getElementById(currentID).style.visibility = "visible";
//
// }, function() {
//     // on mouseout, reset the background colour
//     var currentID = this.getAttribute("data-id");
//     document.getElementById(currentID).style.visibility = "hidden";
// });


});
function buildCodeBlocks() {
    return "<div class='codeBlocks clearfix'>" +
        "<pre class='html'><code>" + getHtml() + "</code></pre>" +
        "<pre class='javascript'><code>" + cleanJson($("head script").last().text()) + "</code></pre>" +
        "<pre class='css'><code>" + cleanCSS($("head style").text()) + "</code></pre>" +
        "</div>";
}


function getHtml() {
    var clone, ul, li, code;

    clone = $("<div />").append($("div#content").contents().not("h2, p").clone());
    ul = clone.find("ul");
    li = ul.find("li");

    li.slice(3, li.length).remove();
    ul.append("...");

    code = clone.html();

    return cleanHTML(code).replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
    ;
    //code = $.tabifier(code, "HTML").replace(/</gi, "&lt;").replace(/>/gi, "&gt;");

}


//ASYNC CSS LOOADING

/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
    "use strict";
    /* exported loadCSS */
    var loadCSS = function( href, before, media ){
        // Arguments explained:
        // `href` [REQUIRED] is the URL for your CSS file.
        // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
        // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
        // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
        var doc = w.document;
        var ss = doc.createElement( "link" );
        var ref;
        if( before ){
            ref = before;
        }
        else {
            var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
            ref = refs[ refs.length - 1];
        }

        var sheets = doc.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        ss.media = "only x";

        // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
        function ready( cb ){
            if( doc.body ){
                return cb();
            }
            setTimeout(function(){
                ready( cb );
            });
        }
        // Inject link
        // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
        // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ready( function(){
            ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
        });
        // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
        var onloadcssdefined = function( cb ){
            var resolvedHref = ss.href;
            var i = sheets.length;
            while( i-- ){
                if( sheets[ i ].href === resolvedHref ){
                    return cb();
                }
            }
            setTimeout(function() {
                onloadcssdefined( cb );
            });
        };

        function loadCB(){
            if( ss.addEventListener ){
                ss.removeEventListener( "load", loadCB );
            }
            ss.media = media || "all";
        }

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if( ss.addEventListener ){
            ss.addEventListener( "load", loadCB);
        }
        ss.onloadcssdefined = onloadcssdefined;
        onloadcssdefined( loadCB );
        return ss;
    };
    // commonjs
    if( typeof exports !== "undefined" ){
        exports.loadCSS = loadCSS;
    }
    else {
        w.loadCSS = loadCSS;
    }
}( typeof global !== "undefined" ? global : this ));

/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function( w ){
    // rel=preload support test
    if( !w.loadCSS ){
        return;
    }
    var rp = loadCSS.relpreload = {};
    rp.support = function(){
        try {
            return w.document.createElement( "link" ).relList.supports( "preload" );
        } catch (e) {
            return false;
        }
    };

    // loop preload links and fetch using loadCSS
    rp.poly = function(){
        var links = w.document.getElementsByTagName( "link" );
        for( var i = 0; i < links.length; i++ ){
            var link = links[ i ];
            if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
                w.loadCSS( link.href, link );
                link.rel = null;
            }
        }
    };

    // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
    if( !rp.support() ){
        rp.poly();
        var run = w.setInterval( rp.poly, 300 );
        if( w.addEventListener ){
            w.addEventListener( "load", function(){
                rp.poly();
                w.clearInterval( run );
            } );
        }
        if( w.attachEvent ){
            w.attachEvent( "onload", function(){
                w.clearInterval( run );
            } )
        }
    }
}( this ));

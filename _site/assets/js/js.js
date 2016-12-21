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

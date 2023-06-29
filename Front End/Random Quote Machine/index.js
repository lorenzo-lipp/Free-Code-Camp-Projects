let data = []
fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(response => {
        data = response.quotes;
        setTimeout(() => {
            getColor();
            getPhrase();
            stopBlink();
        }, 2000);
    });

const colors = [
    "royalblue",
    "firebrick",
    "rebeccapurple",
    "seagreen",
    "saddlebrown",
    "mediumslateblue",
    "indianred"
];

let quote = {};

function getNewRandom(obj, state) {
    let random = Math.floor(Math.random() * obj.length);
    if (obj[random] == state) {
        if (random + 1 == obj.length) {
            random--
        } else { random++ }
    }
    return random
}

function getColor() {
    let color = $(":root").css("--bkg-color");
    let random = getNewRandom(colors, color)
    $(":root").css("--bkg-color", colors[random]);
}

function getPhrase() {
    let random = getNewRandom(data, quote.quote || "");
    quote = data[random];
    $("#text").html(`<i class="fa fa-quote-left" height="40px"></i>${quote.quote}`);
    $("#author").html(`- ${data[random].author}`);
    share();
};

function stopBlink() {
    $("#quote-text").removeClass("blink");
};

function share() {
    $('#tumblr-quote').attr("href", `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${quote.author}&content=${quote.quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`);
    $('#tweet-quote').attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.quote}" ${quote.author}`);
};
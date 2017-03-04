// for navigator language
var lang = window.navigator.language;
// you can change the language 
var lang = 'en';

//change weather params here:
//units: metric or imperial
var weatherParams = {
    'q':'San Diego',
    'units':'metric',
    'lang':lang
};

var feed = 'http://rss.news.yahoo.com/rss/topstories';
//var feed = 'http://www.nu.nl/feeds/rss/achterklap.rss';
//var feed = 'http://www.nu.nl/feeds/rss/opmerkelijk.rss';
//var feed = 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml';

// compliments:
var morning = [
            'Good morning!',
            'It will be a good day!',
            'How was your sleep?'
        ];
        
var afternoon = [
            'Hello, there!',
            'You look great!',
            'Looking good today!'
        ];
       
var evening = [
            'Wow, you are awesome!',
            'You look nice!',
            'Today you rocked!'
        ];

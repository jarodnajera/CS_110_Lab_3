const url = 'http://50.21.190.71/get_tweets';
var tweets = [];

/**
 * Fetches tweets from server and pushes them to
 * tweets array. Also prevents pushing duplicate
 * tweets.
 * @param None, updates var tweets
 * @returns None, updates var tweets
 */
function scrape_tweets() {
    //console.log('enter scrape');
    fetch(url)
        .then(res => res.json()).then(data => {
            data.forEach((tweet) => {
                if(tweets.includes(tweet)) return;
                tweets.push(tweet);
            });
        })
    .catch(err => {
        console.log(err);
    });
}

/**
 * Displays tweets onto page. Also filters
 * tweets based on search bar, and displays
 * them based on date/time (newest to oldest)
 * @param None
 * @returns None, updates page
 */
function display_tweets() {
    //console.log('enter display');
    // filter on search text
    let search = document.getElementById("searchBar").value.trim().toLowerCase();
    let filtered_tweets = null;
    if(search) {
        filtered_tweets = tweets.filter(tweet => tweet.text.trim().toLowerCase().includes(search));
    }
    // sort by date
    let sorted_tweets;
    if(filtered_tweets) {
        sorted_tweets = filtered_tweets.sort((a, b) => {
            return new Date(a.date.replace(/-/g,'/')) - new Date(b.date.replace(/-/g,'/'));
        });
    }
    else {
        sorted_tweets = tweets.sort((a, b) => {
            return new Date(a.date.replace(/-/g,'/')) - new Date(b.date.replace(/-/g,'/'));
        });
    }

    const twitter_feed = document.getElementById("tweets-container");
    // clear tweets container
    while(twitter_feed.firstChild) {
        twitter_feed.removeChild(twitter_feed.firstChild);
    }
    sorted_tweets.forEach((tweet) => {
        // create tweet element
        const tweet_element = document.createElement("div");
        tweet_element.classList.add("tweet");
        // tweet has:
        // avatar
        const tweet_avatar = document.createElement("img");
        tweet_avatar.classList.add("tweet-profile-pic");
        let http = new XMLHttpRequest();
        http.open('HEAD', tweet.avatar, false);
        http.send();
        if(http.status != 404) {
            tweet_avatar.src = tweet.avatar;
        }
        else {
            tweet_avatar.src = "images/ratatouille.jpg";
        }
        
        // tweet content contains:
        const tweet_content = document.createElement("div");
        tweet_content.classList.add("tweet-content");
        // handle
        const tweet_handle = document.createElement("div");
        const tweet_main_handle = document.createElement("span");
        tweet_main_handle.classList.add("main-handle");
        const tweet_side_handle = document.createElement("span");
        tweet_side_handle.classList.add("side-handle");
        tweet_main_handle.appendChild(document.createTextNode(tweet.user_name));
        tweet_side_handle.appendChild(document.createTextNode('@' + tweet.user_name));
        tweet_handle.appendChild(tweet_main_handle);
        tweet_handle.appendChild(tweet_side_handle);
        tweet_content.appendChild(tweet_handle);
        // text content
        const tweet_text = document.createTextNode(tweet.text);
        tweet_content.appendChild(tweet_text);
        // date and time
        const tweet_date = document.createElement("div");
        tweet_date.classList.add("tweet-date");
        tweet_date.appendChild(document.createTextNode(tweet.date));
        tweet_content.appendChild(tweet_date);

        // append new tweet element to twitter feed
        tweet_element.appendChild(tweet_avatar);
        tweet_element.appendChild(tweet_content);
        twitter_feed.appendChild(tweet_element);
    })
}

/**
 * Checks Pause Feed checkbox to see whether
 * or not to continue fetching tweets
 * @param None, updates var tweets
 * @returns None, updates var tweets
 */
function auto_refresh() {
    let isChecked = document.getElementById("pause").checked; //gets status of checkbox  
    if(!isChecked){
        timer = setInterval(() => {
            //console.log('not checked');
            scrape_tweets();
            display_tweets();
        }, 5000);
    }
    else {
        //console.log('checked');
        clearInterval(timer);
    }
}

auto_refresh();

document.getElementById("searchBar").addEventListener('keyup', function(event) { //listens for any input when searching, filters tweets
    display_tweets();
});

document.getElementById("pause").addEventListener('click', auto_refresh);
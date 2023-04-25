const url = 'http://50.21.190.71/get_tweets';

fetch(url)
    .then(res => res.json()).then(data => {
        console.log(data[0]);
        // make tweet objects with data
        let twitter_feed = document.getElementById("content-center");
        data.forEach(function(tweet){
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
            
            // append new tweet element to twitter feed
            tweet_element.appendChild(tweet_avatar);
            tweet_element.appendChild(tweet_content);
            twitter_feed.appendChild(tweet_element);
        })
    })
    .catch(err => {
        console.log(err);
    })

function auto_refresh()
{
    var isChecked = document.getElementById("checkBox").checked; //gets status of checkbox  
        if(isChecked == false){
            time = setInterval(function() {
                //add fetch function
            }, 10000);
        }
        else{
            clearInterval(time);
        }
}

document.getElementById('checkBox').addEventListener('click', auto_refresh); //checkbox activates when clicked

let searchString = "";

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase(); 
    // you may want to update the displayed HTML here too
}

document.getElementById("searchBar").addEventListener("input", handleSearch); //searchbar takes text when clicked
var searchTerms = document.querySelector("searchBar").value;
node.addEventListener("keyup", ({key}) => { //searchbar stores text for searching and clears search bar for next search
    if (key === "Enter") {
        console.log(document.querySelector("#searchBar").value);
    }
})


 
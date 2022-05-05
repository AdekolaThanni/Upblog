import * as config from "./config.js";

// To store current information displayed on page
const state = {
    article: {},
    posts: [],
}

// Network timeout function
const networkTimeout = function(timeout){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error("Timeout"));
        }, timeout * 1000)
    })
}

// Function to get posts from the guardian server
const getPosts = async function(page, category){
    try {
       const sectionCall = `section=${category}`;
       const fetchUrl = `${config.APP_URL}${category === "top" ? "star-ratings=5" : sectionCall}&page-size=${config.PAGE_SIZE}&page=${page}&show-fields=all&api-key=${config.API_KEY}`
        console.log(fetchUrl);
        // Make call
        const response = await Promise.race([fetch(fetchUrl), networkTimeout(config.TIMEOUT)]);
        const data = await response.json();
        // Pushed to state for storage
        state.pages = data.response.pages;
        state.posts = data.response.results;
    } catch (error) {
        throw error;
    }
}

// function to get article object from state.posts array
const getArticle = function(id) {
    state.article = state.posts[id];
}

export {
    state,
    getPosts,
    getArticle
}
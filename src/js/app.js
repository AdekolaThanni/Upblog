import * as model from "./model.js";
import homeView from "./views/homeView.js";
import articleView from "./views/articleView.js";
import {toggle} from "./config.js";

// Control page
const controlPage = async function (page, category){
    toggle();
    await model.getPosts(page, category);
    homeView.render(model.state.posts, model.state.pages);
    toggle();
}
// Control article redering
const controlArticle = function(id){
    model.getArticle(id);
    articleView.render(model.state.article);
}

const init = function(){
    homeView.addLoadHandler(controlPage);
    homeView.addNavigationHandler(controlPage);
    homeView.addPaginationHandler(controlPage);
    articleView.showArticleHandler(controlArticle);
}

// Initialize App 
init();
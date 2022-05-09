import * as model from "./model.js";
import homeView from "./views/homeView.js";
import sectionView from "./views/sectionView.js";
import postsView from "./views/postsView.js";
import paginationView from "./views/paginationView.js";
import articleView from "./views/articleView.js";

const setModelPageAndCategory = function () {
    // model.state.page stores the current page
    model.state.page = paginationView.getPage();
    model.state.category = sectionView.getCategory();
}

// Control posts redering
const controlPage = async function (){
    try {
        homeView.toggle();
        await model.getSections();
        sectionView.render(model.state.sections);
        setModelPageAndCategory();
        await model.getPosts(model.state.page, model.state.category);
        homeView.showNavigation();
        postsView.render(model.state.posts);
        paginationView.updatePaginationUI(model.state.pages);
        homeView.toggle();
    } catch (error) {
        homeView.renderError(error.message);
    }
}

// Control selection of a category
const controlSelection = async function (){
    try {
        homeView.toggle();
        paginationView.resetPage();
        setModelPageAndCategory();
        await model.getPosts(model.state.page, model.state.category);
        postsView.render(model.state.posts);
        paginationView.updatePaginationUI(model.state.pages);
        homeView.toggle();
    } catch (error) {
        homeView.renderError(error.message);
    }
}

// Control pagination
const controlPagination = async function (){
    try {
        homeView.toggle();
        homeView.scrollToTop();
        setModelPageAndCategory();
        await model.getPosts(model.state.page, model.state.category);
        postsView.render(model.state.posts);
        homeView.toggle();
    } catch(error) {
        homeView.renderError(error.message);
    }
}

// Control article redering
const controlArticle = function(id){
    model.getArticle(id);
    articleView.render(model.state.article);
}

const init = function(){
    homeView.addLoadHandler(controlPage);
    homeView.addSelectionHandler(controlSelection);
    paginationView.addPaginationHandler(controlPagination);
    articleView.showArticleHandler(controlArticle);
}

// Initialize App 
init();
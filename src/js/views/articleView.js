import View from "./view.js";
import postsView from "./postsView.js";
import {timeFormatter} from "../config.js";

class ArticleView extends View {

    _parentElement = document.querySelector(".article");
    _parentElementContainer = document.querySelector(".container__article");

    constructor(){
        super();
        this._closeArticle();
    }
    
    // Generate markup
    _generateMarkup() {
        const markup = `
            <a href="#" class="article__back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
            </a>
            <img src="${this._data.fields.thumbnail}" alt="${this._data.fields.headline}" class="article__image">
            <h2 class="article__title">${this._data.fields.headline}</h2>
            <p class="article__content">
                ${this._data.fields.bodyText};
            </p>
            <div class="article__footer">
                <span class="article__timestamp">Date:<br>${timeFormatter(this._data.fields.firstPublicationDate)}</span>
                <span class="article__author">Publication:<br>The Guardian</span>
            </div>
        `;
        return markup;
    }

    // function to toggle article visibility
    _toggleContainer(){
        this._parentElementContainer.classList.toggle("article-visible");
    }

    // Handler function to show article when an event listener is triggered
    showArticleHandler(handler){
        postsView._parentElement.addEventListener("click", function(event){
            const btn = event.target.closest(".btn__read");
            const link = event.target.closest(".posts__post-title");
            if (!btn && !link) return;
            const id = btn ? btn.closest(".posts__post").dataset.id : link.closest(".posts__post").dataset.id;
            handler(id);
            this._toggleContainer();
        }.bind(this));
    }

    // To close article
    _closeArticle() {
        this._parentElement.addEventListener("click", function(event){
            const btn = event.target.closest(".article__back");
            if (!btn) return;
            this._toggleContainer();
        }.bind(this));
    }
};

export default new ArticleView();
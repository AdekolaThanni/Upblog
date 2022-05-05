import View from "./view.js";
import {AVERAGE_WPM, timeFormatter} from "../config.js";

class HomeView extends View {
    _parentElement = document.querySelector(".posts");
    _pageNumber = 1;

    constructor(){
        super();
        this._setCurrentCategory();
    }

    // Generate markup for rendering
    _generateMarkup() {
        const markup = this._data.map((post, index) => {
            if (!post.fields.bodyText) return;
            const markup = `
                <div class="posts__post ${index === 0 ? "posts__post-latest": ""}" data-id=${index}>
                    <img src="${post.fields.thumbnail}" alt="${post.fields.headline}" class="posts__post-thumbnail">
                    <div class="posts__post-details">
                        <div class="posts__post-details--1">
                            <span class="posts__post-niche">${post.sectionName}</span>
                            <span class="separator">.</span>
                            <span class="posts__post-timestamp">${timeFormatter(post.fields.firstPublicationDate)}</span>
                        </div>
                        <div class="posts__post-details--2">
                            <h2 class="posts__post-title">${post.fields.headline}</h2>
                            <p class="posts__post-content">
                                ${index === 0 ? post.fields.bodyText.slice(0, 150) : post.fields.bodyText.slice(0, 150)}...
                            </p>
                        </div>
                        <div class="posts__post-details--3">
                            <span class="posts__post-duration">${Math.floor(post.fields.wordcount / AVERAGE_WPM)} min read</span>
                            <button class="btn btn__read">
                                <span>Read Full</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return markup;
        }).join("");
        return markup;
    }

    // This sets the current category that is being displayed in the homepage
    _setCurrentCategory(){
        this._currentCategory = document.querySelector(".categories__active").dataset.category;
    }


    // Function to update pagination button displays after change
    _updatePaginationUI(){
        const btnPrev = document.querySelector(".pagination__btn--previous");
        const btnNext = document.querySelector(".pagination__btn--next");
        // If page is first hide previous button
        if (this._pageNumber > 1) {
            btnPrev.classList.remove("visibility");  
        } else {
            btnPrev.classList.add("visibility");
        }

        // If page is last hide next button
        if (this._pageNumber === this._pages) {
            btnNext.classList.add("visibility");
        }
    }

    // Once page loads , this triggers the handler function
    addLoadHandler(handler){
        window.addEventListener("load", function(){
            handler(this._pageNumber, this._currentCategory);
        }.bind(this))
    }

    // Navigating through the pages by sections
    addNavigationHandler(handler){
        document.querySelector(".categories").addEventListener("click", function(event){
            // Get clicked element and check if its a category element
            const li = event.target;
            if (!li.classList.contains("categories__category")) return;
            // Set page number back to default which is 1
            this._pageNumber = 1;
            // Update page number display back to default (1)
            document.querySelector(".pagination__current").textContent = this._pageNumber;
            // Get category data
            const {category} = li.dataset;
            // Run handler function
            handler(this._pageNumber, category);
            // Change the active category
            document.querySelector(".categories__active").classList.remove("categories__active");
            li.classList.add("categories__active");
            // Set the category
            this._setCurrentCategory();
            // Update pagination
            this._updatePaginationUI();
        }.bind(this))
    }

    addPaginationHandler(handler) {
        document.querySelector(".pagination").addEventListener("click", function(event){
            // Get button clicked
            const btn = event.target.closest(".pagination__btn");
            if (!btn) return;
            // Get what value btn represents prev(-1) or next(+1)
            const increment = Number(btn.dataset.action);
            // Add it to page number
            this._pageNumber =  this._pageNumber + increment;
            // Update pagination display
            document.querySelector(".pagination__current").textContent = this._pageNumber;
            // Run handler function
            handler(this._pageNumber, this._currentCategory);
            // Scroll back to top
            window.scrollTo({
                left: 0,
                top: 0
            });
            // Update display
            this._updatePaginationUI();
        }.bind(this))
    }
}

export default new HomeView();
import View from "./view.js";

class SectionView extends View {
    _parentElement = document.querySelector(".category__list");
    _currentCategory = document.querySelector(".category__current");
    _categoryText = document.querySelector(".category__current > span");

    constructor() {
        super();
        this._currentCategory.addEventListener("click", this._toggleDropdown.bind(this));
        this._addSelectCategoryListener();
    }

    _generateMarkup() {
        const markup = this._data.map(section => `
            <li class="category__list-item" data-category="${section.id}"><a href="#" class="category__list-link">${section.webTitle}</a></li>
        `).join("");
        return markup;
    };

    _toggleDropdown(){
        this._currentCategory.querySelector("svg").classList.toggle("rotate-icon");
        this._parentElement.classList.toggle("list-visibility");
    }

    _addSelectCategoryListener(){
        this._parentElement.addEventListener("click", function(event){
            const btn = event.target.closest(".category__list-item");
            if (!btn) return;
            this._toggleDropdown();
            const categoryArr = [btn.querySelector("a").textContent, btn.dataset.category];
            this.setCurrentCategory(...categoryArr);
        }.bind(this));
    }

    getCategory(){
        // This returns the value of the current category
        return this._categoryText.dataset.category;
    }

    // This sets the current category that is being displayed in the homepage
    setCurrentCategory(categoryText, categoryId){
        this._categoryText.textContent = categoryText;
        this._categoryText.setAttribute("data-category", categoryId);
    }
}

export default new SectionView();
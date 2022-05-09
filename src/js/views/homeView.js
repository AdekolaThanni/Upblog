import View from "./view.js";
import sectionView from "./sectionView.js";
import postsView from "./postsView.js";

class HomeView extends View {
    _spinner = document.querySelector(".spinner");
    _pagination = document.querySelector(".pagination");
    _footer = document.querySelector(".footer");
    _errorMessage = document.querySelector(".error-message");
    // Once page loads , this triggers the handler function
    addLoadHandler(handler){
        window.addEventListener("load", function(){
            handler();
        })
    }

    // Navigating through the pages by sections
    addSelectionHandler(handler){
        sectionView._parentElement.addEventListener("click", function(event){
            // Get clicked element and check if its a category element
            const li = event.target.closest(".category__list-item");
            if (!li) return;
            // Run handler function
            handler();
        })

        postsView._parentElement.addEventListener("click", function(event){
            // Get clicked element and check if its a category element
            const link = event.target.closest(".posts__post-niche");
            if (!link) return;
            // Run handler function
            sectionView.setCurrentCategory(link.textContent, link.dataset.category);
            this.scrollToTop();
            handler();
        }.bind(this));
    }

    // Show navigation
    showNavigation(){
        document.querySelector(".navigation").classList.remove("display");
    }

    // Helper function to toggle unneeded element when no posts are available
    toggle() {
        this._spinner.classList.toggle("display");
        this._pagination.classList.toggle("display");
        this._footer.classList.toggle("display");
    };

    // Scroll window to top
    scrollToTop(){
        window.scrollTo({
            left: 0,
            top: 0
        });
    };

    // Error rendering
    renderError(message){
        this._spinner.classList.add("display");
        this._errorMessage.classList.remove("display");
        this._errorMessage.textContent = message;  
    }
    
}

export default new HomeView();
import View from "./view.js";

class PaginationView extends View {
    _pageNumber = 1;
    
    _parentElement = document.querySelector(".pagination");
    _currentPage = this._parentElement.querySelector(".pagination__current");

    getPage(){
        return this._currentPage.textContent;
    }

    resetPage(){
        this._pageNumber = 1;
        //Update  display
        this.updatePaginationUI();
    }

    // Function to update pagination button displays after change
    updatePaginationUI(maxPages){
        const btnPrev = document.querySelector(".pagination__btn--previous");
        const btnNext = document.querySelector(".pagination__btn--next");
        // If page is first hide previous button
        if (this._pageNumber > 1) {
            btnPrev.classList.remove("visibility");  
        } else {
            btnPrev.classList.add("visibility");
        }

        // If page is last hide next button
        if (this._pageNumber === maxPages) {
            btnNext.classList.add("visibility");
        }

         // Update pagination display
        this._currentPage.textContent = this._pageNumber;
    }

    addPaginationHandler(handler) {
        this._parentElement.addEventListener("click", function(event){
            // Get button clicked
            const btn = event.target.closest(".pagination__btn");
            if (!btn) return;
            // Get what value btn represents prev(-1) or next(+1)
            const increment = Number(btn.dataset.action);
            // Add it to page number
            this._pageNumber =  this._pageNumber + increment;
            // Update display
            this.updatePaginationUI();
            // Run handler function
            handler();
        }.bind(this))
    };
}

export default new PaginationView();
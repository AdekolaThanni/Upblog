class View {
    //Render data into parent element
    render(data){
        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("beforeend", markup);
    }

    // Clear content in parent element
    _clear(){
        this._parentElement.innerHTML = "";
    }
}

export default View;
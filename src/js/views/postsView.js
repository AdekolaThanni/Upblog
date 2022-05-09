import View from "./view.js";
import {AVERAGE_WPM, timeFormatter} from "../config.js";

class PostsView extends View {
    _parentElement = document.querySelector(".posts");

    // Generate markup for rendering
    _generateMarkup() {
        const markup = this._data.map((post, index) => {
            if (!post.fields.bodyText) return;
            const markup = `
                <div class="posts__post ${index === 0 ? "posts__post-latest": ""}" data-id=${index}>
                    <img src="${post.fields.thumbnail}" alt="${post.fields.headline}" class="posts__post-thumbnail">
                    <div class="posts__post-details">
                        <div class="posts__post-details--1">
                            <span class="posts__post-niche" data-category="${post.sectionId}">${post.sectionName}</span>
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
}

export default new PostsView();
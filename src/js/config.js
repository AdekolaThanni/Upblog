// API key
const API_KEY =  "08be76e1-40ef-4c96-bb82-043dfdabb678";
// Page size
const PAGE_SIZE = 49;
// URL
const APP_URL = "https://content.guardianapis.com/search?";

// Network Time out
const TIMEOUT = 30 // 15 SECONDS

// Initial section load
const INITIAL_SECTION = "top";

// Average words read by adult per minute
const AVERAGE_WPM = 200;

// function to format time
const timeFormatter = function(date){
    const now = new Date();
    const dateObj = new Date(date);
    const options = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }
    const locale = navigator.language;
    const [postDate, nowDate] = [new Intl.DateTimeFormat(locale
        , options).format(dateObj), new Intl.DateTimeFormat(locale
        , options).format(now)];
    const outputDate = postDate.split(",")[0] === nowDate.split(",")[0] ? `Today, ${postDate.split(",")[1]}` : postDate;
    return outputDate;
};

// Helper function to toggle unneeded element when no posts are available
function toggle() {
    document.querySelector(".spinner").classList.toggle("display");
    document.querySelector(".pagination").classList.toggle("display");
    document.querySelector(".footer").classList.toggle("display");
};

export {
    API_KEY,
    PAGE_SIZE,
    APP_URL,
    TIMEOUT,
    INITIAL_SECTION,
    AVERAGE_WPM,
    timeFormatter,
    toggle
}
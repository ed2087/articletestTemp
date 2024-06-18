console.log('global.js loaded');

// Utility function to select an element by ID
const getById = (id) => {
    return document.getElementById(id);
};

// Utility function to select elements by class name
const getByClass = (className) => {
    return document.getElementsByClassName(className);
};

// Utility function to select elements by query selector
const query = (selector) => {
    return document.querySelector(selector);
};

// Utility function to select all elements by query selector
const queryAll = (selector) => {
    return document.querySelectorAll(selector);
};

// Fetch wrapper function for GET requests
const fetchGet = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch GET error:', error);
        throw error;
    }
};

// Fetch wrapper function for POST requests
const fetchPost = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch POST error:', error);
        throw error;
    }
};

// Utility function to debounce a function
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Utility function to throttle a function
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};




// loading bar

const loadingBarTemplate = () => {

    return`
        <div class="lds-facebook"><div></div><div></div><div></div></div>
    `
};

console.log('post.js loaded');

// Initialize global variables
let idTracker = 0;
const contentContainer = getById('content_container');
let storeImages = [];

// Text templates for the title and description
const titleText = 'Tell us your Story.....';
const descriptionText = 'Add A description.....';
const mainContentContainer = 'Whats on your mind.......';

///////////////////// Text Handling Functions /////////////////////

const wipeOnClick = (e) => {
    if (e.target.id === 'title' && e.target.textContent === titleText) {
        e.target.textContent = '';
    }
    if (e.target.id === 'description' && e.target.textContent === descriptionText) {
        e.target.textContent = '';
    }
    if (e.target.id === 'content_container' && e.target.textContent === mainContentContainer) {
        e.target.textContent = '';
    }
    e.target.focus();
};

const restoreTextIfEmpty = (e) => {
    if (e.target.id === 'title' && e.target.textContent.trim() === '') {
        e.target.textContent = titleText;
    }
    if (e.target.id === 'description' && e.target.textContent.trim() === '') {
        e.target.textContent = descriptionText;
    }
    if (e.target.id === 'content_container' && e.target.textContent.trim() === '') {
        e.target.textContent = mainContentContainer;
    }
};

///////////////////// Initialize Title and Description /////////////////////

const titleElement = getById('title');
const descriptionElement = getById('description');
const texteditor = getById('content_container');

if (titleElement) {
    titleElement.classList.add('editablecontent_item');
    titleElement.addEventListener('focus', wipeOnClick);
    titleElement.addEventListener('blur', restoreTextIfEmpty);
}

if (descriptionElement) {
    descriptionElement.classList.add('editablecontent_item');
    descriptionElement.addEventListener('focus', wipeOnClick);
    descriptionElement.addEventListener('blur', restoreTextIfEmpty);
}

if (texteditor) {
    texteditor.classList.add('editablecontent_item');
    texteditor.addEventListener('focus', wipeOnClick);
    texteditor.addEventListener('blur', restoreTextIfEmpty);
}

///////////////////// DOMContentLoaded Event /////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = getById('content_container');

    const checkForCommand = () => {
        console.log(contentContainer.textContent);
        if (contentContainer.textContent.includes(';;')) { 
            showPopup();
        }
    };

    contentContainer.addEventListener('input', checkForCommand);
    contentContainer.addEventListener('keyup', checkForCommand);
    contentContainer.addEventListener('change', checkForCommand);

    // Add event listener to handle popup element selection
    const popupContainer = getById('popup_container');
    popupContainer.addEventListener('change', (e) => {
        if (e.target && e.target.id === 'popup__select') {
            const selectedValue = e.target.value;
            handleElementSelection(selectedValue);
        }
    });

    // Add event listener for adding the selected element
    popupContainer.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'popup__button') {
            addSelectedElement();
        }
    });

});

///////////////////// Show Popup Function /////////////////////

const listenToCancelBUtton = () => {    
    getById("cancel_popup__button").addEventListener('click', (e) => {
        const popupContainer = getById('popup_container');
        popupContainer.style.display = 'none';
    });
};

const showPopup = () => {
    const popupContainer = getById('popup_container');
    popupContainer.innerHTML = popUp_template();
    popupContainer.style.display = 'block';
    listenToCancelBUtton();
};

const popUp_template = () => {
    const elements = [
        { value: 'bold', display: 'Bold Text' },
        { value: 'italic', display: 'Italic Text' },
        { value: 'link', display: 'Hyperlink' },
        { value: 'heading 1', display: 'Large Heading (H1)' },
        { value: 'heading 2', display: 'Medium Heading (H2)' },
        { value: 'heading 3', display: 'Small Heading (H3)' },
        { value: 'math', display: 'Math (LaTeX)' },
        { value: 'unordered list', display: 'List' },
        // { value: 'ordered list', display: 'Ordered List (Numbered)' },
        { value: 'image', display: 'Image' },
        { value: 'underline', display: 'Underlined Text' },
        { value: 'block quote', display: 'Block Quote' },
        { value: 'code', display: 'Code Block' },
        { value: 'table', display: 'Table' },
        { value: 'iframe', display: 'Embed - youtube, vimeo, etc' },
        { value: 'pdf', display: 'PDF Document' },
        { value: 'strikethrough', display: 'Strikethrough Text' },
        { value: 'strong', display: 'Strong Emphasis Text' }
        // { value: 'paragraph', display: 'Paragraph' },
        // { value: 'website embed', display: 'Website Embed' },
    ];

    return `
        <div class="popup" id="popup">
            <p class="popup__explanation">Please select an element to add to your content:</p>
            <div class="popup__wrap" id="popup__wrap">
                <select class="popup__select" id="popup__select">
                    <option value="" disabled selected>Select an element...</option>
                    ${elements.map(element => `<option value="${element.value}">${element.display}</option>`).join('')}
                </select>
            </div>
            ${cancelButton()}
        </div>
    `;
};

// Example cancel button function for reference
const cancelButton = () => {
    return `
        <button class="cancel_popup__button" id="cancel_popup__button">Cancel</button>
    `;
};

///////////////////// Element Selection Handler /////////////////////

const handleElementSelection = (value) => {
    const popupContainer = getById('popup_container');
    switch (value) {
        case 'math':
            popupContainer.innerHTML = math_popup(value);
            break;
        case 'link':
            popupContainer.innerHTML = link_popup(value);
            break;
        case 'bold':
            popupContainer.innerHTML = bold_popup(value);
            break;
        case 'italic':
            popupContainer.innerHTML = italic_popup(value);
            break;
        case 'underline':
            popupContainer.innerHTML = underline_popup(value);
            break;
        case 'strikethrough':
            popupContainer.innerHTML = strikethrough_popup(value);
            break;
        case 'strong':
            popupContainer.innerHTML = strong_popup(value);
            break;
        case 'pdf':
            popupContainer.innerHTML = pdf_popup(value);
            break;
        case 'iframe':
            popupContainer.innerHTML = iframe_popup(value);
            break;
        case 'ordered list':
            popupContainer.innerHTML = orderedList_popup(value);
            break;
        case 'unordered list':
            popupContainer.innerHTML = unorderedList_popup(value);
            break;
        case 'table':
            popupContainer.innerHTML = table_popup(value);
            break;
        case 'code':
            popupContainer.innerHTML = code_popup(value);
            break;
        case 'block quote':
            popupContainer.innerHTML = blockQuote_popup(value);
            break;
        case 'heading 1':
            popupContainer.innerHTML = heading1_popup(value);
            break;
        case 'heading 2':
            popupContainer.innerHTML = heading2_popup(value);
            break;
        case 'heading 3':
            popupContainer.innerHTML = heading3_popup(value);
            break;
        case 'paragraph':
            popupContainer.innerHTML = paragraph_popup(value);
            break;
        case 'website embed':
            popupContainer.innerHTML = websiteEmbed_popup(value);
            break;
        case 'image':
            popupContainer.innerHTML = image_popup(value);
            break;
        default:
            break;
    }

    // Elements that need additional styling
    const textElements = [
        'bold', 'italic', 'underline', 'strikethrough', 'strong',
        'heading 1', 'heading 2', 'heading 3', 'paragraph'
    ];

    if (textElements.includes(value)) {
        attachPopupEventListeners();
    }
};

///////////////////// Add Selected Element Function /////////////////////


function getEmbedURL(url) {
    let embedURL = '';
    const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);

    if (youtubeMatch && youtubeMatch[1]) {
        embedURL = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    } else if (vimeoMatch && vimeoMatch[1]) {
        embedURL = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return embedURL;
}


//tikers
let forms = 0;
let list = 0;
const addSelectedElement = async () => {
    const popupContainer = getById('popup_container');
    const contentContainer = getById('content_container');

    const popupSelect = getById('element_type');
    const selectedValue = popupSelect.value;

    const textColor = getById('text_color') ? getById('text_color').value : '';
    const textSize = getById('text_size') ? getById('text_size').value : '';
    const fontSelect = getById('font_select') ? getById('font_select').value : '';

    let style = '';
    if (textColor) style += `color: ${textColor}; `;
    if (textSize) style += `font-size: ${textSize}rem; `;
    if (fontSelect) style += `font-family: ${fontSelect}; `;

    let replacementText = '';

    switch (selectedValue) {
        case 'math':
            const mathText = getById('math_text').value;
            replacementText = `&#8204;<span class="mathjax" style="${style}">${mathText}</span>&#8204;`;
            break;
        case 'link':
            const linkName = getById('link_name').value;
            const linkURL = getById('link_url').value;
            replacementText = `&#8204;<a href="${linkURL}" style="${style}">${linkName}</a>`;
            break;
        case 'bold':
            const boldText = getById('bold_text').value;
            replacementText = `&#8204;<b style="${style}">${boldText}</b>&#8204;`;
            break;
        case 'italic':
            const italicText = getById('italic_text').value;
            replacementText = `&#8204;<i style="${style}">${italicText}</i>&#8204;`;
            break;
        case 'underline':
            const underlineText = getById('underline_text').value;
            replacementText = `&#8204;<u style="${style}">${underlineText}</u>&#8204;`;
            break;
        case 'strikethrough':
            const strikethroughText = getById('strikethrough_text').value;
            replacementText = `&#8204;<s style="${style}">${strikethroughText}</s>&#8204;`;
            break;
        case 'strong':
            const strongText = getById('strong_text').value;
            replacementText = `&#8204;<strong style="${style}">${strongText}</strong>&#8204;`;
            break;
        case 'pdf':
            const pdfFile = getById('pdf_file').files[0];
            if (pdfFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const pdfDataUrl = e.target.result;
                    const pdfFileName = pdfFile.name;
                    replacementText = `&#8204;<a href="${pdfDataUrl}" download="${pdfFileName}" style="${style}">${pdfFileName}</a>`;
                    updateContentContainer(replacementText);
                };
                reader.readAsDataURL(pdfFile);
                popupContainer.style.display = 'none';
                return;
            }
            break;
        case 'iframe':
            const iframeURL = getById('iframe_url').value;
            const embedURL = getEmbedURL(iframeURL);
            
            if (embedURL) {
                replacementText = `
                    &#8204;<div class="iframe_content_wrap">
                        <iframe src="${embedURL}" style="${style}"></iframe>
                    </div>&#8204;
                `;
            } else {
                // Handle invalid URL or unsupported video service
                replacementText = '';
            }
            break;
        case 'ordered list':
            const orderedListItemsCount = parseInt(getById('ordered_list_items_count').value);
            let orderedListItems = '';
            for (let i = 0; i < orderedListItemsCount; i++) {
                orderedListItems += `<li class="editablecontent_item" contenteditable="true">Item ${i + 1}</li>`;
            }
            replacementText = `&#8204;<ol style="${style}">${orderedListItems}</ol>&#8204;`;
            break;        
        case 'unordered list':
                const listStyleType = getById('list_style_type').value;
                const unorderedListItem = `<li class="unordered_li editablecontent_item" style="list-style-type: ${listStyleType}; ${style}" contenteditable="true"></li>`;
                replacementText = `&#8204;<ul class="unordered_ul" style="margin: 20px 0; list-style-type: ${listStyleType}; ${style}">${unorderedListItem}</ul>&#8204;`;
            break;
        case 'table':
            forms++;
            const rows = parseInt(getById('table_rows').value);
            const cols = parseInt(getById('table_cols').value);
            const tableId = `dynamicTable${forms}`;
        
            let tableButtons = `
                <div class="content_ele_buttons_wrap">
                    <button class="content_ele_button addRow" data-table-id="${tableId}">+ Add Row</button>
                    <button class="content_ele_button addColumn" data-table-id="${tableId}">+ Add Column</button>
                </div>
            `;
        
            let tableHTML = `
                &#8204;<div class="tableWrap">
                    <table border="1" style="${style}" id="${tableId}"> 
                        ${tableButtons}                  
                        <thead>
                            <tr>
            `;
        
            // Add the header row
            for (let j = 0; j < cols; j++) {
                tableHTML += `<th>Header ${j + 1}</th>`;
            }
            tableHTML += '</tr></thead>';
        
            // Add the body rows
            tableHTML += '<tbody>';
            for (let i = 0; i < rows; i++) {
                tableHTML += '<tr>';
                for (let j = 0; j < cols; j++) {
                    tableHTML += `<td>Cell</td>`;
                }
                tableHTML += '</tr>';
            }
            tableHTML += '</tbody></table></div>&#8204;';
            replacementText = tableHTML;
            break;                                  
        case 'code':
            const codeText = getById('code_text').value;
            replacementText = `&#8204;<pre><code style="${style}">${codeText}</code></pre>&#8204;`;
            break;
        case 'block quote':
            const blockQuoteText = getById('block_quote_text').value;
            const quoteAuthor = getById('quote_author').value;
            replacementText = `&#8204;<blockquote style="${style}">${blockQuoteText}<footer>${quoteAuthor}</footer></blockquote>&#8204;`;
            break;
        case 'heading 1':
            const heading1Text = getById('heading1_text').value;
            replacementText = `&#8204;<h1 style="${style}">${heading1Text}</h1>&#8204;`;
            break;
        case 'heading 2':
            const heading2Text = getById('heading2_text').value;
            replacementText = `&#8204;<h2 style="${style}">${heading2Text}</h2>&#8204;`;
            break;
        case 'heading 3':
            const heading3Text = getById('heading3_text').value;
            replacementText = `&#8204;<h3 style="${style}">${heading3Text}</h3>&#8204;`;
            break;
        case 'paragraph':
            const paragraphText = getById('paragraph_text').value;
            replacementText = `&#8204;<p style="${style}">${paragraphText}</p>&#8204;`;
            break;
        case 'website embed':
            const websiteURL = getById('website_url').value;
            replacementText = `&#8204;<iframe src="${websiteURL}" width="100%" height="400px"></iframe>&#8204;`;
            break;
        case 'image':
            const imageFile = getById('image_file').files[0];
            if (imageFile) {

                const formData = new FormData();
                // Create a unique object ID for the image
                const objectID = generateObjectId();
                // Add the image file and object ID to the form data
                formData.append('images', imageFile);
                // Add the object ID to the form data
                formData.append('objectID', objectID);
                // Add the CSRF token to the form data
                const csrfToken = document.getElementById('_csrf').value;
                // Add the CSRF token to the form data
                formData.append('_csrf', csrfToken);

                //add loading bar to show image is being uploaded popup_container
                getById("popup_container").innerHTML = loadingBarTemplate();

                try {
                    const response = await fetch('/upload/images', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-Token': csrfToken
                        },
                        body: formData
                    });

                    const result = await response.json();
                    if (response.ok) {
                        const imageData = result.images[0];
                        replacementText = `
                            &#8204;<div class="img_content_wrap">
                                <img src="${imageData.url}" alt="${imageFile.name}" id="${imageData.public_id}" style="${style}" data-public-id="${imageData.public_id}">                            
                            </div>&#8204;
                        `;
                        
                        updateContentContainer(replacementText);

                    } else {
                        console.error(result.error);
                    }
                } catch (error) {
                    console.error('An error occurred during image upload', error);
                }
            }
            popupContainer.style.display = 'none';
            return;
        default:
            console.log('Unknown element selected');
            break;
    }

    updateContentContainer(replacementText);
    const firstListItem = contentContainer.querySelector('li');
    //moveCursorToElement(firstListItem);
    popupContainer.style.display = 'none';

};


const updateContentContainer = (replacementText) => {

    console.log(replacementText)
    const contentContainer = getById('content_container');
    const content = contentContainer.innerHTML;
    contentContainer.innerHTML = content.replace(';;', replacementText);    


    //if replacement !== unordered_ul class
    if (!replacementText.includes('unordered_ul')) {
        console.log('not unordered_ul')
        moveCursorToEndOfElement(contentContainer);
    }
    //if unordered_ul focus on the li
    if (replacementText.includes('unordered_ul')) {
        console.log('unordered_ul')
        const lastLi = contentContainer.querySelector('.unordered_li');
        lastLi.focus();
    }

    // Reprocess MathJax elements
    MathJax.typeset();
};


const moveCursorToEndOfElement = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
};

///////////////////// Popup Templates /////////////////////
const math_popup = (value) => {
    return `
        <p class="popup__explanation">Enter LaTeX</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="math_text" placeholder="Enter LaTeX code here..."></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const link_popup = (value) => {
    return `
        <p class="popup__explanation">Enter link</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="text" class="popup__input" id="link_name" placeholder="Link name">
            <input type="text" class="popup__input" id="link_url" placeholder="Link URL">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const bold_popup = (value) => {
    return `
        <p class="popup__explanation">Enter text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea style="font-weight: bold;" class="popup__input" id="bold_text" placeholder="Add ${value} text here......"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const italic_popup = (value) => {
    return `
        <p class="popup__explanation">Enter text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea style="font-style: italic;" class="popup__input" id="italic_text" placeholder="Add ${value} text here......"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const underline_popup = (value) => {
    return `
        <p class="popup__explanation">Enter text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea style="text-decoration: underline;" class="popup__input" id="underline_text" placeholder="Add ${value} text here......"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const strikethrough_popup = (value) => {
    return `
        <p class="popup__explanation">Enter text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea style="text-decoration: line-through;" class="popup__input" id="strikethrough_text" placeholder="Add ${value} text here......"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const strong_popup = (value) => {
    return `
        <p class="popup__explanation">Enter text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea style="font-weight: bold;" class="popup__input" id="strong_text" placeholder="Add ${value} text here......"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const pdf_popup = (value) => {
    return `
        <p class="popup__explanation">Upload PDF</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="file" class="popup__input" id="pdf_file" accept="application/pdf">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const iframe_popup = (value) => {
    return `
        <p class="popup__explanation">Enter iframe URL</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="text" class="popup__input" id="iframe_url" placeholder="URL">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const orderedList_popup = (value) => {
    return `
        <p class="popup__explanation">Enter the number of list items</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="number" class="popup__input" id="ordered_list_items_count" placeholder="Number of items">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};


const unorderedList_popup = (value) => {
    return `
        <p class="popup__explanation">Select the list style</p>
        <div class="popup__wrap" id="popup__wrap">
            <select class="popup__input" id="list_style_type">
                <option value="" disabled selected>Select a list style...</option>
                <option value="disc">Disc</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="decimal">Decimal</option>
                <option value="lower-alpha">Lower Alpha</option>
                <option value="upper-alpha">Upper Alpha</option>
                <option value="lower-roman">Lower Roman</option>
                <option value="upper-roman">Upper Roman</option>
                <option value="none">None</option>
            </select>
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};



const table_popup = (value) => {
    return `
        <p class="popup__explanation">Enter table dimensions</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="number" class="popup__input" id="table_rows" placeholder="Rows">
            <input type="number" class="popup__input" id="table_cols" placeholder="Columns">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};


const code_popup = (value) => {
    return `
        <p class="popup__explanation">Enter code</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="code_text" placeholder="Your code here"></textarea>
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const blockQuote_popup = (value) => {
    return `
        <p class="popup__explanation">Enter quote</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="block_quote_text" placeholder="Quote"></textarea>
            <input type="text" class="popup__input" id="quote_author" placeholder="Author">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const heading1_popup = (value) => {
    return `
        <p class="popup__explanation">Enter heading text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="heading1_text" placeholder="Heading"></textarea>
            ${inline_element_text_tools(value)}
        </div>        
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const heading2_popup = (value) => {
    return `
        <p class="popup__explanation">Enter heading text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="heading2_text" placeholder="Heading 2"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const heading3_popup = (value) => {
    return `
        <p class="popup__explanation">Enter heading text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="heading3_text" placeholder="Heading 3"></textarea>
            ${inline_element_text_tools(value)}
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const paragraph_popup = (value) => {
    return `
        <p class="popup__explanation">Enter paragraph text</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="paragraph_text" placeholder="Paragraph"></textarea>
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const websiteEmbed_popup = (value) => {
    return `
        <p class="popup__explanation">Enter website URL</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="text" class="popup__input" id="website_url" placeholder="URL">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const image_popup = (value) => {
    return `
        <p class="popup__explanation">Upload image</p>
        <div class="popup__wrap" id="popup__wrap">
            <input type="file" class="popup__input" id="image_file" accept="image/*">
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
}

///////////////////// Inline Element Text Tools /////////////////////

// Function to return the popup template
const inline_element_text_tools = (mainStyle) => {
    return `
        <div class="popup_stylesWrap">

            <div class="popup_style_item">
                <label for="text_color">Text Color:</label>
                <input type="color" class="popup__input" id="text_color" value="#000000" placeholder="Color">
            </div>
            
            <div class="popup_style_item">
                <label for="text_size">Text Size:</label>
                <input type="range" class="popup__input" id="text_size" min="0.7" max="3" step="0.1" value="1">
                <span id="text_size_value">1rem</span>
            </div>
            
            <div class="popup_style_item">
                <label for="font_select">Font:</label>
                <select class="popup__select" id="font_select">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Arial Black">Arial Black</option>
                </select>
            </div> 

        </div>
    `;
};

// Function to attach event listeners to the popup elements
const attachPopupEventListeners = () => {
    const textColorInput = getById('text_color');
    const textSizeInput = getById('text_size');
    const textSizeValue = getById('text_size_value');
    const fontSelect = getById('font_select');
    const text = query('.popup__input');

    // Flags to check if the user has modified the inputs
    let textSizeModified = false;
    let textColorModified = false;
    let fontModified = false;

    const applyInitialStyles = () => {
        if (text) {
            text.style.fontFamily = ''; // Clear initial styles
            text.style.color = '';
            text.style.fontSize = '';
        }
    };

    const updateTextStyles = () => {
        if (textColorModified) {
            text.style.color = textColorInput.value;
        }
        if (textSizeModified) {
            text.style.fontSize = `${textSizeInput.value}rem`;
            textSizeValue.textContent = `${textSizeInput.value}rem`;
        }
        if (fontModified) {
            text.style.fontFamily = fontSelect.value;
        }
    };

    if (textColorInput) {
        textColorInput.addEventListener('input', () => {
            textColorModified = true;
            updateTextStyles();
        });
        textColorInput.addEventListener('change', () => {
            textColorModified = true;
            updateTextStyles();
        });
    }

    if (textSizeInput) {
        textSizeInput.addEventListener('input', () => {
            textSizeModified = true;
            updateTextStyles();
        });
    }

    if (fontSelect) {
        fontSelect.addEventListener('change', () => {
            fontModified = true;
            updateTextStyles();
        });
    }

    // Apply initial styles when the popup loads
    applyInitialStyles();
};

getById('content_container').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default action (creating a new div)
        document.execCommand('insertLineBreak'); // Insert a line break instead
        return false;
    }
});


//back end jobs 
//1.find create a unique id for each post to add to the images so that we can delete them if not used on post
//2.get all the data from the post and save it to the database
//3.get the images from the post and save them to the database
//4.delete the images that are not used on the post

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = getById('content_container');

    const observer = new MutationObserver((mutationsList) => {
        const imagesToDelete = new Set();

        mutationsList.forEach(mutation => {
            mutation.removedNodes.forEach(node => {
                collectImagesToDelete(node, imagesToDelete);
            });
        });

        imagesToDelete.forEach(publicId => {
            // Check if the image still exists in the contentContainer before deleting
            if (!document.querySelector(`img[data-public-id="${publicId}"]`)) {
                deleteImage(publicId);
            }
        });
    });

    observer.observe(contentContainer, {
        childList: true,
        subtree: true,
        attributes: true, // Observe attribute changes
    });

    const collectImagesToDelete = (node, imagesToDelete) => {
        if (node.nodeType === 1) { // Element node
            if (node.tagName === 'IMG' && node.dataset.publicId) {
                imagesToDelete.add(node.dataset.publicId);
            } else if (node.classList && node.classList.contains('img_content_wrap')) {
                // If the parent container is removed, check if it contains an image
                const img = node.querySelector('img[data-public-id]');
                if (img) {
                    imagesToDelete.add(img.dataset.publicId);
                }
            }
        }

        // Recursively check child nodes to handle nested deletions
        if (node.childNodes.length > 0) {
            node.childNodes.forEach(childNode => collectImagesToDelete(childNode, imagesToDelete));
        }
    };

    const deleteImage = async (publicId) => {
        const csrfToken = document.getElementById('_csrf').value;
    
        try {
            const response = await fetch(`/delete/images/${publicId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': csrfToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ public_id: publicId })
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('An error occurred during image deletion', error);
        }
    };


    /////////////////// Function to handle keydown events for lists  ////////////////////////


    const handleListKeyDown = (event) => {
        console.log('Keydown event:', event.key);
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        const currentElement = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
        console.log('Current element:', currentElement);
    
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Enter key pressed');
            if (currentElement.tagName === 'LI' && currentElement.textContent.trim() !== '') {
                const newLi = document.createElement('li');
                newLi.className = 'editablecontent_item';
                newLi.contentEditable = 'true';
                newLi.textContent = '';
                newLi.style.listStyleType = currentElement.style.listStyleType;
                currentElement.insertAdjacentElement('afterend', newLi);
                console.log('New list item created:', newLi);
                moveCursorToElement(newLi);
            }
        }
    
        if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            console.log('Tab key pressed');
            if (currentElement.tagName === 'LI') {
                handleListTab(currentElement);
            }
        }
    
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            console.log('Shift+Tab key pressed');
            if (currentElement.tagName === 'LI') {
                handleListShiftTab(currentElement);
            }
        }
    };
    
    const handleListTab = (currentElement) => {
        console.log('Handling Tab for element:', currentElement);
        const parentList = currentElement.parentElement;
        let newList;
        if (currentElement.previousElementSibling && currentElement.previousElementSibling.tagName === 'UL') {
            newList = currentElement.previousElementSibling;
        } else {
            newList = document.createElement('ul');
            newList.style.listStyleType = currentElement.style.listStyleType;
            if (currentElement.previousElementSibling) {
                currentElement.previousElementSibling.insertAdjacentElement('afterend', newList);
            } else {
                parentList.insertAdjacentElement('afterbegin', newList);
            }
        }
        newList.appendChild(currentElement);
        console.log('New sublist created and element moved:', newList, currentElement);
        moveCursorToElement(currentElement);
    };
    
    const handleListShiftTab = (currentElement) => {
        console.log('Handling Shift+Tab for element:', currentElement);
        const parentList = currentElement.parentElement;
        const grandParent = parentList.parentElement.closest('ul, ol');
        if (grandParent) {
            parentList.removeChild(currentElement);
            grandParent.insertBefore(currentElement, parentList.nextSibling);
            currentElement.style.listStyleType = grandParent.style.listStyleType;
            console.log('Element moved up a level:', currentElement);
            moveCursorToElement(currentElement);
            if (parentList.children.length === 0) {
                parentList.remove();
                console.log('Parent list removed:', parentList);
            }
        } else {
            console.log('Cannot move element up further');
        }
    };
    
    const moveCursorToElement = (element) => {
        console.log('Moving cursor to element:', element);
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
        console.log('Cursor moved to element:', element);
    };
    
    // Placeholder for checkForCommand function
    const checkForCommand = (event) => {
        console.log('Command check:', event);
    };
    
    contentContainer.addEventListener('keydown', handleListKeyDown);
    contentContainer.addEventListener('input', checkForCommand);
    contentContainer.addEventListener('keyup', checkForCommand);
    contentContainer.addEventListener('change', checkForCommand);



    contentContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('addRow')) {
            const tableId = e.target.dataset.tableId;
            addRow(tableId);
        } else if (e.target && e.target.classList.contains('addColumn')) {
            const tableId = e.target.dataset.tableId;
            addColumn(tableId);
        }
    });


});





function addRow(tableId) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    const cols = table.getElementsByTagName('thead')[0].rows[0].cells.length;
    const newRow = tbody.insertRow();

    for (let i = 0; i < cols; i++) {
        const newCell = newRow.insertCell();
        newCell.innerText = 'Cell';
    }
}

function addColumn(tableId) {
    const table = document.getElementById(tableId);
    const thead = table.getElementsByTagName('thead')[0];
    const tbody = table.getElementsByTagName('tbody')[0];

    // Add a new header cell
    const newHeaderCell = document.createElement('th');
    newHeaderCell.innerText = `Header ${thead.rows[0].cells.length + 1}`;
    thead.rows[0].appendChild(newHeaderCell);

    // Add a new cell to each row in the body
    for (let row of tbody.rows) {
        const newCell = row.insertCell();
        newCell.innerText = 'Cell';
    }
}









// control + z  -- fix images problem allow images to be       


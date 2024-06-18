console.log('post.js loaded');

// Initialize global variables
let idTracker = 0;
const contentContainer = getById('content_container');

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
    titleElement.addEventListener('focus', wipeOnClick);
    titleElement.addEventListener('blur', restoreTextIfEmpty);
}

if (descriptionElement) {
    descriptionElement.addEventListener('focus', wipeOnClick);
    descriptionElement.addEventListener('blur', restoreTextIfEmpty);
}

if (texteditor) {
    texteditor.addEventListener('focus', wipeOnClick);
    texteditor.addEventListener('blur', restoreTextIfEmpty);
}

///////////////////// DOMContentLoaded Event /////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = getById('content_container');

    const checkForCommand = () => {
        console.log(contentContainer.textContent);
        if (contentContainer.textContent.includes('new()')) { 
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
        { value: 'heading 1', display: 'Large Heading (H1)' },
        { value: 'heading 2', display: 'Medium Heading (H2)' },
        { value: 'heading 3', display: 'Small Heading (H3)' },
        { value: 'bold', display: 'Bold Text' },
        { value: 'italic', display: 'Italic Text' },
        { value: 'underline', display: 'Underlined Text' },
        { value: 'strikethrough', display: 'Strikethrough Text' },
        { value: 'strong', display: 'Strong Emphasis Text' },
        { value: 'link', display: 'Hyperlink' },
        { value: 'image', display: 'Image' },
        { value: 'pdf', display: 'PDF Document' },
        { value: 'iframe', display: 'Embedded Frame (iFrame)' },
        { value: 'ordered list', display: 'Ordered List (Numbered)' },
        { value: 'unordered list', display: 'Unordered List (Bulleted)' },
        { value: 'table', display: 'Table' },
        { value: 'code', display: 'Code Block' },
        { value: 'block quote', display: 'Block Quote' },
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
            break
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

const addSelectedElement = () => {
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
            replacementText = `
                &#8204;<div class="iframe_content_wrap">
                    <iframe src="${iframeURL}" style="${style}"></iframe>
                </div>&#8204;
            `;
            break;
        case 'ordered list':
            const orderedListItems = getById('ordered_list_items').value.split(',').map(item => item.trim());
            replacementText = `&#8204;<ol style="${style}">${orderedListItems.map(item => `<li>${item}</li>`).join('')}</ol>&#8204;`;
            break;
        case 'unordered list':
            const unorderedListItems = getById('unordered_list_items').value.split(',').map(item => item.trim());
            replacementText = `&#8204;<ul style="${style}">${unorderedListItems.map(item => `<li>${item}</li>`).join('')}</ul>&#8204;`;
            break;
        case 'table':
            const rows = parseInt(getById('table_rows').value);
            const cols = parseInt(getById('table_cols').value);
            let tableHTML = `&#8204;<table border="1" style="${style}">`;
            for (let i = 0; i < rows; i++) {
                tableHTML += '<tr>';
                for (let j = 0; j < cols; j++) {
                    tableHTML += `<td>Cell</td>`;
                }
                tableHTML += '</tr>';
            }
            tableHTML += '</table>&#8204;';
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

            //1.we need to upload to cdatabase and cloaudanary get link back
            //2. then we can use that link to display the image
            //3. we can also use the link to download the image optional-maybe
            //4.detect if image is too large and resize it
            //5. check if image has been deleted from content and if so delete from cloudinary and database

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDataUrl = e.target.result;
                    const imageFileName = imageFile.name;
                    replacementText = `
                        &#8204;<div class="img_content_wrap">
                            <img src="${imageDataUrl}" alt="${imageFileName}" style="${style}">                            
                        </div>&#8204;
                    `;
                    updateContentContainer(replacementText);
                };
                reader.readAsDataURL(imageFile);
                popupContainer.style.display = 'none';
                return;
            }
            break;
        default:
            console.log('Unknown element selected');
            break;
    }
    updateContentContainer(replacementText);
    popupContainer.style.display = 'none';
};

const updateContentContainer = (replacementText) => {
    const contentContainer = getById('content_container');
    const content = contentContainer.innerHTML;
    contentContainer.innerHTML = content.replace('new()', replacementText);
    moveCursorToEndOfElement(contentContainer);
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
        <p class="popup__explanation">Enter list items (separated by commas)</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="ordered_list_items" placeholder="Item 1, Item 2, Item 3"></textarea> 
        </div>
        <input type="hidden" id="element_type" value="${value}">
        <button class="popup__button" id="popup__button">Add</button>
    `;
};

const unorderedList_popup = (value) => {
    return `
        <p class="popup__explanation">Enter list items (separated by commas)</p>
        <div class="popup__wrap" id="popup__wrap">
            <textarea class="popup__input" id="unordered_list_items" placeholder="Item 1, Item 2, Item 3"></textarea>
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



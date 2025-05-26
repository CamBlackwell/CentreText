let isTextCentered = false;
let originalStyles = [];
let currentWidth = 1500;

function centreAllText() {
    if (isTextCentered) return;

    const containers = document.querySelectorAll('body, main, #root, [role="main"], .container, .content, .wrapper');
    containers.forEach((container, index) => {
        container.style.setProperty('max-width', currentWidth + 'px', 'important');
        container.style.setProperty('margin', '0 auto', 'important');
    });

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, li, span, a, td, th, label, button');

    textElements.forEach((element, index) => {
        originalStyles[index] = {
                textAlign: element.style.textAlign,
                margin: element.style.margin,
                maxWidth: element.style.maxWidth,
            };
        element.style.setProperty('text-align', 'center', 'important');
    });

    isTextCentered = true;
}

function revertAllText() {
    if (!isTextCentered) return;

    const containers = document.querySelectorAll('body, main, #root, [role="main"], .container, .content, .wrapper');
    containers.forEach((container, index) => {
        container.style.removeProperty('max-width');
        container.style.removeProperty('margin');

    });
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, li, span, a, td, th, label, button');

    textElements.forEach((element, index) => {
        if (originalStyles[index]) {
            element.style.textAlign = originalStyles[index].textAlign || '';
        }
        element.style.removeProperty('text-align');
    });

    isTextCentered = false;
    originalStyles = [];
}

function toggleTextCentering() {
    if (isTextCentered) {
        revertAllText();
    } else {
        centreAllText();
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateWidth') {
        currentWidth = request.width;
        if (isTextCentered) {
            const containers = document.querySelectorAll('body, main, #root, [role="main"], .container, .content, .wrapper');
            containers.forEach(container => {
                container.style.setProperty('max-width', currentWidth + 'px', 'important');
            });
        }
        sendResponse({centred : isTextCentered});
    } else if (request.action === 'toggleTextCentering') {
        toggleTextCentering();
        sendResponse({centred : true});
    }
});

console.log('Content script loaded successfully');
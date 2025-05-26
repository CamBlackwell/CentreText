let isTextCentered = false;
let originalStyles = [];

function centreAllText() {
    if (isTextCentered) return;

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, li, span, a, td, th, label, button');

    textElements.forEach((element, index) => {
        originalStyles[index] = element.style.textAlign;
        element.style.textAlign = 'center';
    });

    isTextCentered = true;
}

function revertAllText() {
    if (!isTextCentered) return;

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, li, span, a, td, th, label, button');

    textElements.forEach((element, index) => {
        element.style.textAlign = originalStyles[index] || '';
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
    if (request.action === 'toggleTextCentering') {
        toggleTextCentering();
        sendResponse({centred : isTextCentered});
    }
});
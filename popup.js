document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-text-centering');
    const status = document.querySelector('.status');
    const widthSlider = document.getElementById('width-slider');
    const widthDisplay = document.getElementById('width-display');

    widthSlider.addEventListener('input', function() {
        widthDisplay.textContent = this.value + 'px';
    });

    widthSlider.addEventListener('change', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'setWidth', 
                width: widthSlider.value
            });
        });
    });


    toggleBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleTextCentering'}, function(response) {
                if (response) {
                    if (response.centred) {
                        toggleBtn.textContent = "Restore to original";
                        status.textContent = 'Text is centred';
                        toggleBtn.style.backgroundColor = '#f44336';
                    } else {
                        toggleBtn.textContent = "Toggle Centre Text";
                        status.textContent = 'Text is normal';
                        toggleBtn.style.backgroundColor = '#4CAF50';
                    }
                }
            });
        });
    });
});
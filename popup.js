document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-text-centering');
    const status = document.querySelector('.status');

    toggleBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleTextCentering'}, function(response) {
                if (response) {
                    if (response.centred) {
                        toggleBtn.textContent = "Restore to original";
                        status.textContent = 'Text is centred';
                        toggleBtn.style.backgroundColor = '#f44336';
                    } else {
                        toggleBtn.textContent = "Centre Text";
                        status.textContent = 'Text is normal';
                        toggleBtn.style.backgroundColor = '#4CAF50';
                    }
                }
            });
        });
    });
});
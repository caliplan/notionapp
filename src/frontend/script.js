document.addEventListener('DOMContentLoaded', function() {
    const apiSettingsForm = document.getElementById('apiSettingsForm');
    
    if (apiSettingsForm) {
        apiSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const apiKey = document.getElementById('apiKey').value;
            // Here you would typically send this to your backend
            console.log('API Key submitted:', apiKey);
            alert('Settings saved!');
        });
    }
});
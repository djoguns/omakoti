document.getElementById('postcode').addEventListener('input', async function() {
    const query = this.value;
    
    if(query.length < 3) {
        return;
    }

    try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${query}/autocomplete`);
        const data = await response.json();
        
        if(data.result) {
            displaySuggestions(data.result);
        }
    } catch(error) {
        console.error('Error:', error);
    }
});

function displaySuggestions(suggestions) {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion;
        div.addEventListener('click', () => {
            document.getElementById('postcode').value = suggestion;
            suggestionBox.innerHTML = '';
        });
        suggestionBox.appendChild(div);
    });
}

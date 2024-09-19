document.addEventListener('DOMContentLoaded', function() {
    const fetchDataButton = document.getElementById('fetchDataButton');
    const notionDataContainer = document.getElementById('notionDataContainer');

    fetchDataButton.addEventListener('click', async () => {
        try {
            fetchDataButton.disabled = true;
            fetchDataButton.textContent = 'Fetching...';
            notionDataContainer.innerHTML = 'Loading...';

            console.log('Sending request to Netlify function...');
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'fetch-notion-data' }),
            });
            console.log('Received response from Netlify function');
            const data = await response.json();
            console.log('Parsed response data:', data);

            if (response.ok) {
                displayNotionData(data.databases);
            } else {
                throw new Error(data.error || data.details || 'Failed to fetch Notion data');
            }
        } catch (error) {
            console.error('Error fetching Notion data:', error);
            notionDataContainer.innerHTML = `Error: ${error.message}`;
        } finally {
            fetchDataButton.disabled = false;
            fetchDataButton.textContent = 'Fetch Notion Data';
        }
    });

    function displayNotionData(databases) {
        if (!databases || databases.length === 0) {
            notionDataContainer.innerHTML = 'No databases found.';
            return;
        }

        let html = '<h3>Notion Databases</h3><ul>';
        databases.forEach(db => {
            html += `<li>
                <strong>${db.title[0]?.plain_text || 'Untitled'}</strong>
                <br>ID: ${db.id}
                <br>Created time: ${new Date(db.created_time).toLocaleString()}
            </li>`;
        });
        html += '</ul>';

        notionDataContainer.innerHTML = html;
    }
});
// Load and display data in table when page loads
async function loadData() {
    const tableDiv = document.getElementById("data-table");
    tableDiv.innerHTML = '<p>Loading data...</p>';

    try {
        const response = await fetch('/api/submit');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            tableDiv.innerHTML = createTable(result.data);
        } else {
            tableDiv.innerHTML = '<p>No data available. Submit a form first.</p>';
        }
    } catch (error) {
        tableDiv.innerHTML = '<p>Error loading data</p>';
    }
}

// Create HTML table from data
function createTable(data) {
    return `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Submitted At</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        <td>${row.id}</td>
                        <td>${escapeHtml(row.name)}</td>
                        <td>${formatDate(row.dob)}</td>
                        <td>${formatDate(row.date_from)}</td>
                        <td>${formatDate(row.date_to)}</td>
                        <td>${formatDateTime(row.created_at)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Helper functions
function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '-';
    return new Date(dateTimeString).toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);
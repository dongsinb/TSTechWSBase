document.getElementById('dashboard').addEventListener('click', function() {
    showSection('dashboard-section');
});

document.getElementById('user').addEventListener('click', function() {
    showSection('user-section');
});

document.getElementById('analytics').addEventListener('click', function() {
    showSection('analytics-section');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'flex';
        } else {
            section.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fetchData = () => {
        fetch('http://127.0.0.1:5555/data')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('data-table');
                tableBody.innerHTML = ''; // Clear existing table data
                data.forEach(item => {
                    const row = document.createElement('tr');
                    const name = document.createElement('td');
                    name.textContent = item.name;
                    const email = document.createElement('td');
                    email.textContent = item.email;
                    row.appendChild(name);
                    row.appendChild(email);
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // Fetch data when the page loads
    fetchData();

    // Add event listener to the refresh button
    document.getElementById('refresh-button').addEventListener('click', fetchData);
});


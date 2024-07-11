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
    fetch('http://localhost:3001/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table');
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
});

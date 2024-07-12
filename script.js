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


// document.addEventListener('DOMContentLoaded', () => {
//     const fetchData = () => {
//         fetch('http://127.0.0.1:5555/data')
//             .then(response => response.json())
//             .then(data => {
//                 const tableBody = document.getElementById('data-table');
//                 tableBody.innerHTML = ''; // Clear existing table data
//                 data.forEach(item => {
//                     const row = document.createElement('tr');
//                     const name = document.createElement('td');
//                     name.textContent = item.name;
//                     const email = document.createElement('td');
//                     email.textContent = item.email;
//                     row.appendChild(name);
//                     row.appendChild(email);
//                     tableBody.appendChild(row);
//                 });
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     };

//     // Fetch data when the page loads
//     fetchData();

//     // Add event listener to the refresh button
//     document.getElementById('refresh-button').addEventListener('click', fetchData);
// });


document.addEventListener('DOMContentLoaded', function() {
    const refreshButton = document.getElementById('refresh-button');

    refreshButton.addEventListener('click', fetchData);

    function fetchData() {
        fetch('http://127.0.0.1:5555/data')
            .then(response => response.json())
            .then(data => {
                renderTable(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function renderTable(data) {
        const tableHeader = document.getElementById('table-header');
        const tableBody = document.getElementById('table-body');

        // Clear previous data
        tableHeader.innerHTML = '';
        tableBody.innerHTML = '';

        // Create table headers dynamically based on the structure of the first item
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeader.appendChild(th);
        });

        // Add a header for the "Lấy hàng" button column
        const thButton = document.createElement('th');
        thButton.textContent = 'Lấy hàng';
        tableHeader.appendChild(thButton);

        // Create table rows and cells dynamically
        data.forEach(item => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                if (typeof item[header] === 'object') {
                    // Render sub-object (orderslist) as a nested table
                    const subTable = createSubTable(item[header]);
                    td.appendChild(subTable);
                } else {
                    td.textContent = item[header];
                }
                tr.appendChild(td);
            });

            // Add a cell for the "Lấy hàng" button
            const tdButton = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Lấy hàng';
            button.classList.add('lay-hang-button');
            button.addEventListener('click', function() {
                alert('Lấy hàng cho id: ' + item._id);
            });
            tdButton.appendChild(button);
            tr.appendChild(tdButton);

            tableBody.appendChild(tr);
        });
    }

    function createSubTable(subObject) {
        const parentTable = document.createElement('table');

        Object.keys(subObject).forEach(subKey => {
            const subTable = document.createElement('table');
            const trHeader = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Đơn hàng';
            const th2 = document.createElement('th');
            th2.textContent = 'Mã sản phẩm';
            const th3 = document.createElement('th');
            th3.textContent = 'Số lượng';
            trHeader.appendChild(th1);
            trHeader.appendChild(th2);
            trHeader.appendChild(th3);
            subTable.appendChild(trHeader);

            Object.entries(subObject[subKey]).forEach(([productCode, quantity]) => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.textContent = subKey; // Đơn hàng
                const td2 = document.createElement('td');
                td2.textContent = productCode; // Mã sản phẩm
                const td3 = document.createElement('td');
                td3.textContent = quantity; // Số lượng
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                subTable.appendChild(tr);
            });

            const trParent = document.createElement('tr');
            const tdParent = document.createElement('td');
            tdParent.appendChild(subTable);
            trParent.appendChild(tdParent);
            parentTable.appendChild(trParent);
        });

        return parentTable;
    }
});








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
        fetch(`http://192.168.100.164:4000/getData`)
            .then(response => response.json())
            .then(data => {
                renderTable(data['data']);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function searchData(searchTerm = '') {
        console.log("searchTerm: ", searchTerm)
        fetch(`http://192.168.100.164:4000/getDatabyLisencePlate?lisenceplate=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                console.log("data: ", data)
                renderTable(data['data']);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value;
        
        searchData(searchTerm);
    });

    function renderTable(data) {
        const tableHeader = document.getElementById('table-header');
        const tableBody = document.getElementById('table-body');

        // Clear previous data
        tableHeader.innerHTML = '';
        tableBody.innerHTML = '';

        // Create table headers dynamically based on the structure of the first item
        const headers = ['id', 'date', 'license_plate', 'orders list'];
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
                if (header === 'orders list') {
                    // Render orderslist as a nested table
                    const subTable = createSubTable(item.orderslist);
                    td.appendChild(subTable);
                } else if (header === 'id') {
                    td.textContent = item['idx'];
                    // td.textContent = item['_id'];
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
                alert('Lấy hàng cho id: ' + item.idx);
                // alert('Lấy hàng cho id: ' + item._id);
            });
            tdButton.appendChild(button);
            tr.appendChild(tdButton);

            tableBody.appendChild(tr);
        });
    }

    function createSubTable(subObject) {
        const subTable = document.createElement('table');
        subTable.classList.add('sub-table');
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

        Object.keys(subObject).forEach(order => {
            const products = subObject[order];
            const productKeys = Object.keys(products);
            const productValues = Object.values(products);

            // Create rows for each product
            for (let i = 0; i < productKeys.length; i++) {
                const tr = document.createElement('tr');

                // Only add the "Đơn hàng" cell for the first product in each order
                if (i === 0) {
                    const tdOrder = document.createElement('td');
                    tdOrder.textContent = order;
                    tdOrder.rowSpan = productKeys.length;
                    tr.appendChild(tdOrder);
                }

                const tdProductCode = document.createElement('td');
                tdProductCode.textContent = productKeys[i];
                tr.appendChild(tdProductCode);

                const tdQuantity = document.createElement('td');
                tdQuantity.textContent = productValues[i];
                tr.appendChild(tdQuantity);

                subTable.appendChild(tr);
            }
        });

        return subTable;
    }

    // Initial fetch
    fetchData();
});









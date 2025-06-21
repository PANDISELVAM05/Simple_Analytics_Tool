document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const table = document.getElementById("excel-table");

    // Load from localStorage on refresh
    const savedData = localStorage.getItem("csvData");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        renderTable(parsedData);
        displayHeaders(parsedData[0]);
    }

    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                const data = results.data;
                if (data.length === 0) return;

                localStorage.setItem("csvData", JSON.stringify(data));
                renderTable(data);
                displayHeaders(data[0]);
            }
        });
    });

    function renderTable(data) {
        table.innerHTML = ""; // Clear existing content

        // Table Header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        data[0].forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Table Body
        const tbody = document.createElement("tbody");

        for (let i = 1; i < data.length; i++) {
            const row = document.createElement("tr");
            data[i].forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
    }

    function displayHeaders(headers) {
        let container = document.getElementById('header-display');
        if (!container) {
            container = document.createElement('div');
            container.id = 'header-display';
            container.style.margin = "20px 0";
            container.innerHTML = "<h4>CSV Headers:</h4><ul></ul>";
            document.body.insertBefore(container, document.getElementById('table-container'));
        }

        const ul = container.querySelector('ul');
        ul.innerHTML = ''; // Clear old headers

        headers.forEach(header => {
            const li = document.createElement('li');
            li.textContent = header;
            ul.appendChild(li);
        });
    }
});

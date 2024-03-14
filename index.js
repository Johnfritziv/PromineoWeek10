function sortTable() {
    let table, rows, switching, i, x, y, shouldSwitch; // Initializing all my variables
    table = document.getElementById("tableBody");
    switching = true;
    // Loop through the table until we're done switching rows around.
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        // Loop through all table rows (except the first, which contains table headers):
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Get the major tourney wins value, one from current row and one from the next:
            x = rows[i].getElementsByTagName("TD")[3]; // Currently index 3 to select Major Wins column to sort by
            y = rows[i + 1].getElementsByTagName("TD")[3]; 

            // Check if the two rows should switch place, putting larger wins higher in the list.
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function updateRank() {
    var tableBody = document.getElementById("tableBody");
    var rows = tableBody.rows;
    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("TD")[0].innerHTML = i + 1; // Update the rank column to be the value of the index + 1
    }
}


document.getElementById('addRowForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Get values from form inputs
    let column1 = document.getElementById('column1').value;
    let column2 = document.getElementById('column2').value;
    let column3 = document.getElementById('column3').value;

    // Find the table body and insert a new row
    let tableBody = document.getElementById('tableBody');
    let newRow = `<tr>
                        <td></td>
                        <td>${column1}</td>
                        <td>${column2}</td>
                        <td>${column3}</td>
                    </tr>`; // Rank column left blank to be updated after sorting.

    tableBody.innerHTML += newRow;

        // Sort the table
        sortTable();

        // Update the rank
        updateRank();

    // Optionally, clear the form fields after submission
    document.getElementById('addRowForm').reset();
});
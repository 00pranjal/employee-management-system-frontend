// Department Management

// Function to get all departments
function getAllDepartments() {
    fetch('http://localhost:8090/deloitte-jax-rs-demo/departments') 
        .then(response => response.json())
        .then(data => {
            const departmentList = document.getElementById('department-list');
            departmentList.innerHTML = '';
            data.forEach(department => {
                const row = `<tr>
                    <td>${department.id}</td>
                    <td>${department.name}</td>
                    <td>${department.location}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteDepartment(${department.id})">Delete</button>
                    </td>
                </tr>`;
                departmentList.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching departments:', error));
}

// add a department
document.getElementById('department-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const departmentId = document.getElementById('departmentId').value;
    const name = document.getElementById('departmentName').value;
    const location = document.getElementById('location').value;

    const department = { name: name, location: location };

    const method = departmentId ? 'PUT' : 'POST';
    const url = departmentId ? `http://localhost:8090/deloitte-jax-rs-demo/departments/${departmentId}` : 'http://localhost:8090/deloitte-jax-rs-demo/departments';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department)
    })
        .then(response => response.json())
        .then(data => {
            alert('Department saved successfully');
            getAllDepartments();
        })
        .catch(error => console.error('Error saving department:', error));
});

// Function to get department by ID
document.getElementById('get-department-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const departmentId = document.getElementById('departmentIdSearch').value;

    fetch(`http://localhost:8090/deloitte-jax-rs-demo/departments/${departmentId}`)
        .then(response => response.json())
        .then(department => {
            const departmentData = `
                <p>ID: ${department.id}</p>
                <p>Name: ${department.name}</p>
                <p>Location: ${department.location}</p>
            `;
            document.getElementById('department-data').innerHTML = departmentData;
        })
        .catch(error => console.error('Error fetching department by ID:', error));
});

// Function to delete a department
function deleteDepartment(id) {
    fetch(`http://localhost:8090/deloitte-jax-rs-demo/departments/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            alert('Department deleted');
            getAllDepartments();
        })
        .catch(error => console.error('Error deleting department:', error));
}

// Load all departments when the page loads
document.addEventListener('DOMContentLoaded', getAllDepartments);
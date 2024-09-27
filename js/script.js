// Employee Management

// Function to get all employees
function getAllEmployees() {
    fetch('http://localhost:8090/deloitte-jax-rs-demo/employees')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employee-list');
            employeeList.innerHTML = '';
            data.forEach(employee => {
                const row = `<tr>
                    <td>${employee.id}</td>
                    <td>${employee.firstName}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.department ? employee.department.id : 'No Department'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                </tr>`;
                employeeList.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
}

// Function to add an employee
function addEmployee(employee) {
    fetch('http://localhost:8090/deloitte-jax-rs-demo/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(data => {
        alert('Employee added successfully');
        getAllEmployees(); 
        resetForm();
    })
    .catch(error => console.error('Error adding employee:', error));
}

// Function to get employee by ID
document.getElementById('get-employee-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const employeeId = document.getElementById('employeeIdSearch').value;

    fetch(`http://localhost:8090/deloitte-jax-rs-demo/employees/${employeeId}`)
        .then(response => response.json())
        .then(employee => {
            const employeeData = `
                <p>ID: ${employee.id}</p>
                <p>Name: ${employee.firstName}</p>
                <p>Salary: ${employee.salary}</p>
                <p>Department: ${employee.department ? employee.department.name : 'No Department'}</p>
            `;
            document.getElementById('employee-data').innerHTML = employeeData;
        })
        .catch(error => console.error('Error fetching employee by ID:', error));
});

// Function to handle form submission
document.getElementById('employee-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const firstName = document.getElementById('firstName').value;
    const salary = document.getElementById('salary').value;
    const departmentId = document.getElementById('departmentId').value;

    const employee = {
        firstName: firstName,
        salary: salary,
        department: { id: departmentId }
    };
    addEmployee(employee); 
});

// Function to reset the form
function resetForm() {
    document.getElementById('employeeId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('departmentId').value = '';
    
    document.getElementById('addEmployeeBtn').style.display = 'inline-block';
}

// Function to delete an employee
function deleteEmployee(id) {
    fetch(`http://localhost:8090/deloitte-jax-rs-demo/employees/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Employee deleted');
        getAllEmployees(); 
    })
    .catch(error => console.error('Error deleting employee:', error));
}

// Load all employees when the page loads
document.addEventListener('DOMContentLoaded', getAllEmployees);


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

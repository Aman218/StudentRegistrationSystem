const studentName = document.getElementById("student-name");
const studentId = document.getElementById("student-id");
const studentNumber = document.getElementById("student-num");
const studentMail = document.getElementById("student-mail");
const addingStudent = document.querySelector(".newly-registered");

// Load students from localStorage on page load
window.addEventListener("load", loadFromLocalStorage);

// Register button
const registerButton = document.querySelector(".add-btn");
registerButton.addEventListener("click", printName);

function printName() {
    console.log(studentName.value, "typeof", typeof (studentName.value));
    console.log(studentId.value);
    console.log(studentMail.value);
    console.log(studentNumber.value);

    // Check if any input field is vacant
    if (studentId.value === "" || studentMail.value === "" || studentName.value === "" || studentNumber.value === "") {
        alert("Enter valid input field");
        return;
    }

    if (isValidName(studentName.value) === false) {
        alert("Type the name in proper format");
        clearInputFields();
        return;
    }

    if (isValidEmail(studentMail.value) === false) {
        alert("Type the email in proper format");
        clearInputFields();
        return;
    }

    const student = {
        name: studentName.value,
        id: studentId.value,
        number: studentNumber.value,
        mail: studentMail.value
    };

    addStudentToTable(student);
    saveStudentToLocalStorage(student);
    clearInputFields();
}

function isValidName(value) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value.trim());
}

function isValidEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
}

function addStudentToTable(student) {
    const newDiv = document.createElement("tr");

    const item1 = document.createElement("td");
    const item2 = document.createElement("td");
    const item3 = document.createElement("td");
    const item4 = document.createElement("td");
    const item5 = document.createElement("td");

    item1.classList.add("detailOfnewlyStudent");
    item2.classList.add("detailOfnewlyStudent");
    item3.classList.add("detailOfnewlyStudent");
    item4.classList.add("detailOfnewlyStudent");
    item5.classList.add("detailOfnewlyStudent");

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("editButton");

    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("deleteButton");

    item5.appendChild(editButton);
    item5.appendChild(deleteButton);

    item1.textContent = student.name;
    item2.textContent = student.id;
    item3.textContent = student.mail;
    item4.textContent = student.number;

    newDiv.appendChild(item1);
    newDiv.appendChild(item2);
    newDiv.appendChild(item3);
    newDiv.appendChild(item4);
    newDiv.appendChild(item5);
    addingStudent.appendChild(newDiv);

    editButton.addEventListener('click', handleEdit);
    deleteButton.addEventListener('click', handleDelete);
}

function handleEdit(event) {
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');

    studentName.value = cells[0].textContent;
    studentId.value = cells[1].textContent;
    studentMail.value = cells[2].textContent;
    studentNumber.value = cells[3].textContent;

    row.remove();
    updateLocalStorage();

}

function handleDelete(event) {
    const row = event.target.closest('tr');
    row.remove();
    updateLocalStorage()

}

function clearInputFields() {
    studentName.value = "";
    studentId.value = "";
    studentNumber.value = "";
    studentMail.value = "";
}

function saveStudentToLocalStorage(student) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function loadFromLocalStorage() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentToTable(student));
}

function updateLocalStorage() {
    let students = [];
    const rows = document.querySelectorAll('.newly-registered tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const student = {
            name: cells[0].textContent,
            id: cells[1].textContent,
            mail: cells[2].textContent,
            number: cells[3].textContent
        };
        students.push(student);
    });
    localStorage.setItem('students', JSON.stringify(students));
}

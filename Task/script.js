//@ts-nocheck
var ul = document.querySelector('ul');
var input = document.getElementById('name');
var searchInput = document.getElementById('searchInput');
var itemsArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];
var arr = [];
itemsArray.forEach(addTask);
function addTask(text, status) {
    if (status === void 0) { status = 'to-do'; }
    var li = document.createElement('li');
    var check = document.createElement('input');
    var dropdown = document.createElement('select');
    var deleteButton = document.createElement('button');
    var inp = document.createElement('input');
    var taskInput = document.createElement('input');
    check.type = 'checkbox';
    dropdown.appendChild(new Option('To Do', 'to-do'));
    dropdown.appendChild(new Option('In Progress', 'in-progress'));
    dropdown.appendChild(new Option('Completed', 'completed'));
    dropdown.id = "listt";
    dropdown.value = status;
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteBtn';
    inp.type = 'text';
    inp.id = 'idd';
    inp.value = text;
    inp.classList.add('task-input');
    taskInput.type = 'text';
    taskInput.value = text;
    taskInput.classList.add('task-input');
    li.taskInput = taskInput;
    li.appendChild(check);
    li.appendChild(inp);
    li.appendChild(dropdown);
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', function () {
        ul.removeChild(li);
        var taskIndex = itemsArray.indexOf(text);
        var arrIndex = arr.findIndex(function (item) { return item.text === text; });
        console.log(arrIndex);
        if (arrIndex !== -1) {
            arr.splice(arrIndex, 1);
        }
        if (taskIndex !== -1) {
            itemsArray.splice(taskIndex, 1);
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
    });
    arr.push({ text: text, status: 'to-do' });
    dropdown.addEventListener('change', function () {
        if (dropdown.value === 'completed') {
            check.checked = true;
            check.disabled = true;
            dropdown.disabled = true;
            inp.style.textDecoration = 'line-through';
            inp.disabled = true;
        }
        else {
            check.checked = false;
            inp.style.textDecoration = 'none';
        }
    });
    console.log(arr);
    ul.appendChild(li);
}
searchInput.addEventListener('input', function () {
    var searchTerm = searchInput.value.toLowerCase();
    ul.innerHTML = '';
    itemsArray.forEach(function (task) {
        if (task.toLowerCase().includes(searchTerm)) {
            addTask(task);
        }
    });
});
function add() {
    if (input.value === '') {
        alert('Please add a task!');
    }
    else {
        if (itemsArray.includes(input.value)) {
            alert('Task exists');
        }
        else {
            itemsArray.push(input.value);
            localStorage.setItem('items', JSON.stringify(itemsArray));
            addTask(input.value);
            input.value = '';
        }
    }
}

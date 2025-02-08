const taskInput = document.querySelector('#task_input');
const tBody = document.querySelector('#tbody')
const taskids = document.querySelector('#taskids')

function addTask(){
    let task = localStorage.getItem('tasks');
    if(task){
        task = JSON.parse(task);
    }else{
        task =[];
    }

    let newTask = taskInput.value;
    if (newTask.trim() != ''){
        let taskId = Math.round(Math.random()*1000);
        task.push({
            id: taskId,
            task: newTask,
            completed: false
        });
        
        localStorage.setItem('tasks', JSON.stringify(task));
        taskInput.value='';
        renderTask();
    }else{
        alert("Please enter a task");
    }
};

function renderTask(){
    let task = localStorage.getItem('tasks');
    if(task){
        task = JSON.parse(task);
    }else{
        task = [];
    }
    
    tBody.innerHTML='';
    task.forEach(singleTask =>{
        let tr = document.createElement('tr');
        tr.innerHTML =`<td>
                            <label class="custom_checkbox"  >
                                <input type="checkbox" class = "taskselect" onchange = "selectTask(${singleTask.id},this)"  value="${singleTask.id}" >
                                <span class="checkbox_indicator" </span>
                            </label>
                        </td>
                        <td>${singleTask.task}</td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" class="switch_input" ${singleTask.completed ? 'checked':''} onchange="updateStatus(${singleTask.id})">
                                <span class="switch_indicator" value="${singleTask.id}"></span>
                            </label>
                        </td>
                        <td>
                            <button type="button" class="remove_task" onclick="removeTask(this,${singleTask.id} )">Remove</button>
                        </td>`

        tBody.append(tr);
    });
};

renderTask();

function removeTask(removeBtn, taskId){
    removeBtn.closest('tr').remove();
    
    let task = localStorage.getItem('tasks');
    task = JSON.parse(task);
    
    let newTask = task.filter(singleTask => singleTask.id !== taskId);
    localStorage.setItem('tasks',JSON.stringify(newTask));
};

function updateStatus(taskid){
    let task = localStorage.getItem('tasks');
    task = JSON.parse(task);

    let getTask = task.find(singleTask => singleTask.id === taskid);
    getTask.completed = !getTask.completed;
    localStorage.setItem('tasks',JSON.stringify(task));
};

function selectTask(taskid, checkbox){
    let taskidsValue = taskids.value;
    if(taskidsValue != ''){
        taskidsValue = JSON.parse(taskidsValue);
    }else{
        taskidsValue = []
    }

    if (! taskidsValue.includes(taskid)){
        taskidsValue.push(taskid);
    }else{
        let taskindex = taskidsValue.indexOf(taskid);
        taskidsValue.splice(taskindex,1);
    }
    taskids.value = JSON.stringify(taskidsValue); 
    
};

function bulkSelect(bulkSelect){
    let taskCheckbox = document.querySelectorAll('.taskselect');
    let ids =[];
    if(bulkSelect.target.checked){
        taskCheckbox.forEach(checkbox => {
            checkbox.checked = true;
            ids.push(parseInt(checkbox.value));
        });
    }else{
        taskCheckbox.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    taskids.value = JSON.stringify(ids)
};

function removeAll(){
    let taskIdsValue = taskids.value;
    let task = localStorage.getItem('tasks');
    task = JSON.parse(task);
    if(taskIdsValue != ''){
        let newTask = task.filter(singleTask => !taskIdsValue.includes(singleTask.id));
        localStorage.setItem('tasks',JSON.stringify(newTask));
        renderTask();
        document.querySelector('.select_all').checked = false;
        taskids.value = [];
    }else{
        alert('Can not delete');
    }
};
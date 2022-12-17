//유저가 값을 입력한다
//+ 버튼을 클릭하면 아이템이 추가된다.
//유저가 delete를 누르면 아이템이 삭제된다.
//check를 누르면 할 일이 끝나면서 밑줄이 간다.

//진행중을 클릭하면 언더바가 이동한다.
//전체 끝남탭. 진행중, 

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add");
let tabs=document.querySelectorAll(".task-tabs div");
let list=[];
let taskList =[];
let filterList= [];
let mode ='all';
addButton.addEventListener("click",()=>{
    if(taskInput.value.length>1){
        addTask();
        taskInput.value="";
    }
});
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if(taskInput.value.length>1){
            addTask();
            taskInput.value="";
        }
}});

taskInput.addEventListener("focus",()=>{
    taskInput.value="";
});
console.log(tabs);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    if(mode == "all"){
        list = taskList;
    }else if (mode == "ongoing" || mode== "done"){
        list = filterList;
    }
    let resultHTML =''
    for(let i=0; i<list.length; i++){

        if(list[i].isComplete == true){
            resultHTML += `<div class="task task-done">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
               <button onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-rotate-left"></i></button>
               <button onclick ="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>
       </div>`
        }else{
            resultHTML += `<div class="task">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
               <button id="green" onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-check"></i></button>
               <button id="pink" onclick ="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>
       </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML; 
}

function toggleComplete(id){
    console.log("id:",id)
   for(let i=0; i<list.length; i++){
    if(list[i].id == id){
        list[i].isComplete = !list[i].isComplete;
        break;
    }
   }
   render();
   console.log(list)
   console.log(taskList)
}

function deleteTask(id){
   for(let i=0; i<list.length; i++){
        if(list[i].id==id){
            taskList.splice(i,1)
            filterList.splice(i,1)
            break;
        }
   }
   console.log("list:",list)
   render();
}

function filter(event){
    mode = event.target.id;
  filterList=[];

  document.getElementById("under-line").style.width=
  event.target.offsetWidth+ "px";
  document.getElementById("under-line").style.top=
  event.target.offsetHeight+ "px";
  document.getElementById("under-line").style.left=
  event.target.offsetLeft + "px";


   if(mode == "all"){
    render();
   }else if(mode == "ongoing"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == false){
            filterList.push(taskList[i]);
        }
    }    
    
    render();
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }    
        
    }
    render();
   }

function randomIDGenerate(){
    return '_'+ Math.random().toString(36).substr(2, 9);
}

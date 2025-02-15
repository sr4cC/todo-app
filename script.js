import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAr4TTK2oUE-ZlzDUwYbI37Oz7NjZeVwE", 
    authDomain: "todo-app-b6bbe.firebaseapp.com",
    projectId: "todo-app-b6bbe",
    storageBucket: "todo-app-b6bbe.appspot.com",  
    messagingSenderId: "230401610103",
    appId: "1:230401610103:web:db05c04d261eab1d765172",
    measurementId: "G-R6RWQQ006E"
};

//get firebase in
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "tasks");

//add the task to firebase
async function addTaskToFirestore(taskText) {
    try {
        const docRef = await addDoc(tasksCollection, { text: taskText, checked: false });
        console.log("Task added with ID:", docRef.id);
        renderTask(docRef.id, taskText, false); //give to the rendertask all of the info
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

//delete task from firebase itself
async function deleteTaskFromFirestore(taskId, li) {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        li.remove();
        console.log("Task deleted with ID:", taskId);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

async function updateTaskCheckedStatus(taskId, checked) {
    try {
        await updateDoc(doc(db, "tasks", taskId), { checked: checked });
        console.log("Task checked status updated for ID:", taskId, "to:", checked);
    } catch (error) {
        console.error("Error updating task checked status:", error);
    }
}

//show the task actually
function renderTask(taskId, taskText, checked) {
    const ul = document.getElementById("TasksUl");
    let li = document.createElement("li");
    const deleteButton = document.createElement("button");
    let checkBox = document.createElement("input");

    checkBox.type = "checkbox";
    checkBox.classList.add("check-box");
    li.classList.add("li-text");
    li.textContent = taskText;
    checkBox.checked = checked; //checked to the checked (t/f)

    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
        deleteTaskFromFirestore(taskId, li);
    });

    checkBox.addEventListener("click", function () {
        const isChecked = checkBox.checked;
        updateTaskCheckedStatus(taskId, isChecked);  // Update Firestore
        if (isChecked) {
            li.style.textDecoration = "line-through";
            li.style.color = "rgb(90, 90, 90)";
            li.style.transition = "0.5s";
        } else {
            li.style.textDecoration = "none";
            li.style.color = "black";
        }
    });

    li.appendChild(checkBox);
    li.appendChild(deleteButton);
    ul.appendChild(li);
}

async function loadTasks() {
    const ul = document.getElementById("TasksUl");
    ul.innerHTML = "";
    const text = document.getElementById("DisappearingText");
    const querySnapshot = await getDocs(tasksCollection);
    querySnapshot.forEach((doc) => {
        text.style.display = "none";
        const taskData = doc.data();
        renderTask(doc.id, taskData.text, taskData.checked); // Retrieve and pass checked status
    });
}

//when u click the button it saves it to firebase
document.getElementById("AddButton").addEventListener("click", function () {
    const input = document.getElementById("AddInput");
    const taskText = input.value.trim();


    if (taskText !== "") {
        addTaskToFirestore(taskText); // Saves in firebase
        input.value = "";
    }
});

//checks if theres li in th ul
function checkIfTasksExist() {
    const ul = document.getElementById("TasksUl");  
    const taskItems = ul.getElementsByTagName("li");  
    const text = document.getElementById("DisappearingText");


    if (taskItems.length > 0) {  
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}


checkIfTasksExist(); 
loadTasks();
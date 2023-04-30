// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://bagit-86b57-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref (database, "shoppingList")

// Elements
const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

// Event Listeners
addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    // push(shoppingListInDB, inputValue)    
    appendItem(inputValue)    
    clearInput()
    

})

// Functions
function clearInput() {
    inputField.value = ""
}

function appendItem(item){
    
    shoppingList.innerHTML += `<li>${item}</li>`

}
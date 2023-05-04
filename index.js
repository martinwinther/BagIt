// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
	databaseURL:
		"https://bagit-86b57-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

// Elements
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

// Event Listeners
addButton.addEventListener("click", function () {
	let inputValue = inputField.value;
	push(shoppingListInDB, inputValue);
	clearInput();
});

// Firebase methods

onValue(shoppingListInDB, function (snapshot) {
	let itemsArray = Object.entries(snapshot.val());
	clearShoppingList();

	for (const currentItem of itemsArray) {
		let currentItemID = currentItem[0];
		let currentItemValue = currentItem[1];
		appendItem(currentItem);
	}
});

// Functions
function clearInput() {
	inputField.value = "";
}

function clearShoppingList() {
	shoppingList.innerHTML = "";
}

function appendItem(item) {
	let itemID = item[0];
	let itemValue = item[1];
	let newItem = document.createElement("li");
	newItem.textContent = itemValue;
	shoppingList.append(newItem);
}

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
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
	// onValue runs anytime new items are added

	if (snapshot.exists()) {
		let itemsArray = Object.entries(snapshot.val());
		clearShoppingList();

		for (const currentItem of itemsArray) {
			let currentItemID = currentItem[0];
			let currentItemValue = currentItem[1];
			appendItem(currentItem);
		}
	} else {
		shoppingList.innerHTML = "No items here... yet";
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

	newItem.addEventListener("click", function () {
		let removedItem = ref(database, `shoppingList/${itemID}`);
		remove(removedItem);
	});

	shoppingList.append(newItem);
}

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Configure Firebase app with database URL
const appSettings = {
	databaseURL:
		"https://bagit-86b57-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

// Set reference to the "shoppingList" node in the database
const shoppingListInDB = ref(database, "shoppingList");

// Get references to HTML elements in the DOM
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

// Add event listeners to the "add" button and the shopping list
addButton.addEventListener("click", addItem);
shoppingList.addEventListener("click", removeItem);

// Listen for changes to the "shoppingList" node in the database and call the renderShoppingList function whenever there is a change
onValue(shoppingListInDB, renderShoppingList);

// Function to add a new item to the "shoppingList" node in the database
function addItem() {
	let inputValue = inputField.value;
	push(shoppingListInDB, inputValue); // Add new item to the "shoppingList" node in the database
	clearInput(); // Clear the input field after adding the item
}

// Function to remove an item from the "shoppingList" node in the database
function removeItem(event) {
	let targetItem = event.target;
	let itemID = targetItem.dataset.id;
	let removedItem = ref(database, `shoppingList/${itemID}`);
	remove(removedItem); // Remove the item from the "shoppingList" node in the database
}

// Function to render the shopping list based on the current state of the "shoppingList" node in the database
function renderShoppingList(snapshot) {
	// onValue runs anytime new items are added
	if (snapshot.exists()) {
		// Check if there are any items in the "shoppingList" node in the database
		let itemsArray = Object.entries(snapshot.val()); // Convert the snapshot of the "shoppingList" node to an array of items
		clearShoppingList(); // Clear the current contents of the shopping list in the DOM
		for (const currentItem of itemsArray) {
			let currentItemID = currentItem[0];
			let currentItemValue = currentItem[1];
			createItem(currentItemID, currentItemValue); // Create a new list item in the DOM for each item in the "shoppingList" node in the database
		}
	} else {
		shoppingList.innerHTML = "No items here... yet"; // Display a message to the user if there are no items in the "shoppingList" node in the database
	}
}

// Function to clear the input field after adding an item
function clearInput() {
	inputField.value = "";
}

// Function to clear the current contents of the shopping list in the DOM
function clearShoppingList() {
	shoppingList.innerHTML = "";
}

// Function to create a new list item in the DOM for each item in the "shoppingList" node in the database
function createItem(itemID, itemValue) {
	// Create a new HTML element for the item, in this case an "li" (list item)
	let newItem = document.createElement("li");

	// Set the text content of the new item to the value of the item
	newItem.textContent = itemValue;

	// Set a custom attribute called "data-id" on the new item, with the value of the item's ID
	newItem.dataset.id = itemID;

	// Add the new item to the shopping list (which is an HTML element with the ID "shopping-list")
	shoppingList.append(newItem);
}

// TODO:
// Auth Function

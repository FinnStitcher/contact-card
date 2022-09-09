import {toggleForm, clearForm} from './form';
import {fetchCards} from './cards';
import { initDb, getDb, postDb, deleteDb, editDb } from './database';

import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Tooltip, Toast, Popover } from 'bootstrap';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.jpg';

// Form functionality
const form = document.getElementById('formToggle');
const newContactButton = document.getElementById('new-contact');
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
	toggleForm();
});

form.addEventListener('submit', event => {
	// Handle data
	event.preventDefault();
	let name = document.getElementById('name').value;
	let phone = document.getElementById('phone').value;
	let email = document.getElementById('email').value;
	let profile = document.querySelector('input[type="radio"]:checked').value;

    editDb(profileId, name, email, phone, profile);

	// Post form data to IndexedDB OR Edit an existing card in IndexedDB
	if (submitBtnToUpdate == false) {
		postDb(name, email, phone, profile);
	} else {
		fetchCards();
		// Toggles the submit button back to POST functionality
		submitBtnToUpdate = false;
	}

	// Clear form
	clearForm();
	// Toggle form
	toggleForm();
	// Reload the DOM
	fetchCards();
});

window.addEventListener('load', function () {
	document.getElementById('logo').src = Logo;
	document.getElementById('bearThumbnail').src = Bear;
	document.getElementById('dogThumbnail').src = Dog;

	// needs to go after the image declarations or the images dont load
	initDb();

	fetchCards();
});

// attached to the window so any card can be deleted
// event propagation!
// the cards are being generated with these functions already attached to the buttons
// though, actually, that is a weird setup. why do we need to make these functions global if they're already on there?
// it stops working if i dont do that, but still! weird!
window.deleteCard = (e) => {
    let id = parseInt(e.id);

    deleteDb(id);

    fetchCards();
};

window.editCard = (e) => {
    // dataset comes with the DOM api - it contains all the values attached to data-* attributes
    // that would have been beneficial to learn earlier!
    profileId = parseInt(e.dataset.id);

    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById('name').value = editName;
    document.getElementById('email').value = editEmail;
    document.getElementById('phone').value = editPhone;

    form.style.display = "block";

    submitBtnToUpdate = true;
};
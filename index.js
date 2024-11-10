const contactForm = document.getElementById('contactForm');
const contactsContainer = document.getElementById('contactsContainer');
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');

nombreInput.addEventListener('input', () => {
    nombreInput.value = nombreInput.value.replace(/[^a-zA-Z\s]/g, '');
    nombreInput.value = nombreInput.value.replace(/\b\w/g, char => char.toUpperCase());
});

telefonoInput.addEventListener('input', () => {
    telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, '');
});

function getContacts() {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function displayContacts() {
    contactsContainer.innerHTML = '';
    const contacts = getContacts();

    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';

        const contactDetails = document.createElement('div');
        contactDetails.className = 'contact-details';
        contactDetails.innerHTML = `
            <p><strong>Nombre:</strong> ${contact.nombre}</p>
            <p><strong>Teléfono:</strong> ${contact.telefono}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Dirección:</strong> ${contact.direccion}</p>
        `;

        const contactActions = document.createElement('div');
        contactActions.className = 'contact-actions';

        const editButton = document.createElement('button');
        editButton.innerHTML = '✏️';
        editButton.onclick = () => editContact(index);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑️';
        deleteButton.onclick = () => deleteContact(index);

        contactActions.append(editButton, deleteButton);
        contactCard.append(contactDetails, contactActions);
        contactsContainer.appendChild(contactCard);
    });
}

function addOrUpdateContact(e) {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();

    if (!nombre || !telefono || !email) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }

    const contacts = getContacts();
    const contactIndex = contactForm.dataset.index;

    const newContact = { nombre, telefono, email, direccion };

    if (contactIndex) {
        contacts[contactIndex] = newContact;
        delete contactForm.dataset.index;
    } else {
        contacts.push(newContact);
    }

    saveContacts(contacts);
    displayContacts();
    contactForm.reset();
}

function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    displayContacts();
}

function editContact(index) {
    const contacts = getContacts();
    const contact = contacts[index];

    nombreInput.value = contact.nombre;
    telefonoInput.value = contact.telefono;
    document.getElementById('email').value = contact.email;
    document.getElementById('direccion').value = contact.direccion;

    contactForm.dataset.index = index;
}

contactForm.addEventListener('submit', addOrUpdateContact);
displayContacts();

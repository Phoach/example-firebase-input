const db = firebase.firestore()
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().location;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

// getting data
db.collection('Shop').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Shop').add({
        name: form.name.value,
        location: form.location.value
    });
    form.name.value = '';
    form.location.value = '';
});
const BODY = document.querySelector('body');

let dataArr = [
    {
        name: 'купить хлеб',
        info: 'в определенном магазине',
        status: '2',
    },
    {
        name: 'решить задачу',
        info: 'очень сложная',
        status: '1',
    },
]



function builder () {
    const container = document.createElement('div');
    container.classList.add('container');
    const controls = document.createElement('div');
    controls.classList.add('controls');

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    const mainTitle = document.createElement('h1');
    mainTitle.innerText = 'TODO List';

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');



    BODY.append(container);
    container.append(controls);
    container.append(wrapper);
    wrapper.append(listContainer);
    wrapper.append(noteContainer);
    controls.append(mainTitle);
    controls.append(btnContainer);

    notesBuilder();
}

function notesBuilder () {
    const listContainer = document.querySelector('.list-container');
    
    dataArr.forEach( function (i) {
        const note = document.createElement('div');
        note.classList.add('note');
        if (i['status'] == '1') {note.style.backgroundColor = 'grey'};
        if (i['status'] == '2') {note.style.backgroundColor = 'lightblue'};
        if (i['status'] == '3') {note.style.backgroundColor = 'lightgreen'};
        const noteTitle = document.createElement('h2');
        noteTitle.innerText = i['name'];
        listContainer.append(note);
        note.append(noteTitle);
        
    })
}


document.addEventListener('DOMContentLoaded', builder);
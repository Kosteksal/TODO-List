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
    {
        name: 'забрать посылку',
        info: 'возможна очередь',
        status: '3',
    },
];

let position = 0;



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

    descBuilder();
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
        noteTitle.classList.add('note-title');
        noteTitle.id = dataArr.indexOf(i);
        noteTitle.innerText = i['name'];
        listContainer.append(note);
        note.append(noteTitle);
        
    })


    noteDescript ();
}

function descBuilder () {
    const descArea = document.querySelector('.note-container');
    const textArea = document.createElement('textarea');
    textArea.classList.add('text');
    const titleArea = document.createElement('textarea');
    titleArea.classList.add('title-text');
    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.innerText = 'Save';
    titleArea.value = dataArr[position]['name'];
    textArea.value = dataArr[position]['info'];
    descArea.append(titleArea);
    descArea.append(textArea);
    descArea.append(saveBtn);

    noteSaver();
}


function noteDescript () {
   const notes = document.querySelectorAll('.note-title');
    notes.forEach(i => i.addEventListener('click', (event) => {
        position = event.target.id;
        document.querySelector('.note-container').innerHTML = '';
        descBuilder();
        console.log(event.target.id);
    }))

}

function noteSaver () {
    const saveBtn = document.querySelector('.save-btn');
    const nameText = document.querySelector('.title-text');
    const text = document.querySelector('.text');
    saveBtn.addEventListener('click', () => {
        dataArr[position]['name'] = `${nameText.value}`;
        document.querySelector('.list-container').innerHTML = '';
        notesBuilder();
        dataArr[position]['info'] = `${text.value}`;
        document.querySelector('.note-container').innerHTML = '';
        descBuilder();
    })
}

document.addEventListener('DOMContentLoaded', builder);
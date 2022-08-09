const BODY = document.querySelector('body');

let dataArr = [
    {
        name: 'купить хлеб',
        info: 'в определенном магазине',
        ststus: '2',
    },
    {
        name: 'решить задачу',
        info: 'очень сложная',
        ststus: '1',
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
}


document.addEventListener('DOMContentLoaded', builder);
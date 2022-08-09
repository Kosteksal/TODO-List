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
}
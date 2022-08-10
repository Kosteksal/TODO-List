const BODY = document.querySelector("body");


//// массив с данными заметок
let dataArr = [
  {
    name: "купить хлеб",
    info: "в определенном магазине",
    status: "2",
  },
  {
    name: "решить задачу",
    info: "очень сложная",
    status: "1",
  },
  {
    name: "забрать посылку",
    info: "возможна очередь",
    status: "3",
  },
];

let position = 0;
let isNew = 0;
let statusArr = ["waiting", "in process", "ready"];
let statusInfo;
let startNote = 0;

////функция для разметки основных блоков
function builder() {
  const container = document.createElement("div");
  container.classList.add("container");
  const controls = document.createElement("div");
  controls.classList.add("controls");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  const mainTitle = document.createElement("h1");
  mainTitle.innerText = "TODO List";
  const addBtn = document.createElement("button");
  addBtn.classList.add("add-btn");
  addBtn.innerText = "New";
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.innerText = "DELETE";
  const findArea = document.createElement('input');
  findArea.classList.add('finder');
  findArea.type = 'text';
  findArea.placeholder = 'Find note';
  const findBtn = document.createElement('div');
  findBtn.classList.add('find-btn');
  findBtn.innerHTML = '&#128270;';

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");

  BODY.append(container);
  container.append(controls);
  container.append(wrapper);
  wrapper.append(listContainer);
  wrapper.append(noteContainer);
  controls.append(mainTitle);
  controls.append(btnContainer);
  btnContainer.append(delBtn);
  btnContainer.append(addBtn);
  btnContainer.append(findArea);
  btnContainer.append(findBtn);

  notesBuilder();

  descBuilder();

  newAdder();

  remover();

  finder();
}

////функция для построения списка заметок, данные берутся из массива
function notesBuilder() {
  const listContainer = document.querySelector(".list-container");
////разделение на цвета по статусу
  dataArr.forEach(function (i) {
    const note = document.createElement("div");
    note.classList.add("note");
    if (i["status"] == "1") {
      note.style.backgroundColor = "grey";
    }
    if (i["status"] == "2") {
      note.style.backgroundColor = "lightblue";
    }
    if (i["status"] == "3") {
      note.style.backgroundColor = "lightgreen";
    }
    const noteTitle = document.createElement("h2");
    noteTitle.classList.add("note-title");
    noteTitle.id = dataArr.indexOf(i);
    noteTitle.innerText = i["name"];
    listContainer.append(note);
    note.append(noteTitle);
  });

  noteDescript();
}


////функция строит поле редактирования заметки
function descBuilder() {
  const descArea = document.querySelector(".note-container");
  const textArea = document.createElement("textarea");
  textArea.classList.add("text");
  const titleArea = document.createElement("textarea");
  titleArea.classList.add("title-text");
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Save";
  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  titleArea.value = dataArr[position]["name"];
  textArea.value = dataArr[position]["info"];
  descArea.append(titleArea);
  descArea.append(textArea);
  descArea.append(statusContainer);
  statusArr.forEach((i) => {
    const statusItem = document.createElement("div");
    statusItem.classList.add(`status${statusArr.indexOf(i)}`);
    statusItem.classList.add("status-item");
    statusItem.innerText = i;
    statusContainer.append(statusItem);
  });

  // const status = document.querySelector(`.status${dataArr[position]['status'] - 1}`);
  // status.style.border = '2px solid black';

  descArea.append(saveBtn);
  statusInfo = dataArr[position]["status"];

  noteSaver();

  statusChanger();
}


////функция для подсвечивания выделенной заметки
function noteDescript() {
  const notes = document.querySelectorAll(".note-title");
  notes[startNote].style.border = "3px solid red";
  notes.forEach((i) =>
    i.addEventListener("click", (event) => {
      position = event.target.id;
      document.querySelector(".note-container").innerHTML = "";//перерисовка поля изменения в зависимости от выделенной заметки
      descBuilder();
      console.log(event.target.id);
      notes.forEach((e) => (e.style.border = "none"));
      event.target.style.border = "3px solid red";
      isNew = 0;
    })
  );
}


////сохранение изменений в заметке
function noteSaver() {
  const saveBtn = document.querySelector(".save-btn");
  const nameText = document.querySelector(".title-text");
  const text = document.querySelector(".text");
  if (isNew === 0) {
    saveBtn.addEventListener("click", () => {
      dataArr[position]["status"] = statusInfo;
      dataArr[position]["name"] = `${nameText.value}`;
      document.querySelector(".list-container").innerHTML = "";
      startNote = position;
      notesBuilder();
      dataArr[position]["info"] = `${text.value}`;
      document.querySelector(".note-container").innerHTML = "";
      descBuilder();
    });
  }
  if (isNew === 1) {  //если это новая заметка кноака save добавляет данные в массив с заметками
    statusInfo = 1;
    saveBtn.addEventListener("click", () => {
      dataArr.push({
        name: `${nameText.value}`,
        info: `${text.value}`,
        status: statusInfo,
      });
      isNew = 0;
      document.querySelector(".list-container").innerHTML = "";
      document.querySelector(".note-container").innerHTML = "";
      startNote = dataArr.length - 1;
      position = dataArr.length - 1;
      notesBuilder();
      descBuilder();
    });
  }
}


////при нажатии на кнопку new убираем выделение заметок и очищаем поле изменений
function newAdder() {
  const btn = document.querySelector(".add-btn");
  btn.addEventListener("click", () => {
    document.querySelector(".note-container").innerHTML = "";
    isNew = 1;
    const notes = document.querySelectorAll(".note-title");
    notes.forEach((e) => (e.style.border = "none"));
    const descArea = document.querySelector(".note-container");
    const textArea = document.createElement("textarea");
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    textArea.classList.add("text");
    const titleArea = document.createElement("textarea");
    titleArea.classList.add("title-text");
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save-btn");
    saveBtn.innerText = "Save";
    titleArea.value = "";
    textArea.value = "";
    descArea.append(titleArea);
    descArea.append(textArea);
    descArea.append(statusContainer);

    statusArr.forEach((i) => {
      const statusItem = document.createElement("div");
      statusItem.classList.add(`status${statusArr.indexOf(i)}`);
      statusItem.classList.add("status-item");
      statusItem.innerText = i;
      statusContainer.append(statusItem);
    });
    descArea.append(saveBtn);
    noteSaver();
    statusChanger();
  });
}


////смена статуса заметки
function statusChanger() {
  const statuses = document.querySelectorAll(".status-item");
  statuses.forEach((i) => {
    i.addEventListener("click", (event) => {
      statusInfo = Number(event.target.className[6]) + 1;
      console.log(statusInfo);
      statuses.forEach((i) => (i.style.border = "none"));
      event.target.style.border = "2px solid black";
      // descArea.append(saveBtn);
      //noteSaver();
    });
  });
}



////удаление заметки при нажатии кнопки delete
function remover() {
  const btn = document.querySelector(".del-btn");
  btn.addEventListener("click", (even) => { //если заметок не осталось оставляем одну пустую
    if (dataArr.length <= 1) {
      newAdder();
      dataArr[0] = {
        name: "",
        info: "",
        status: statusInfo,
      };
      document.querySelector(".list-container").innerHTML = "";
      document.querySelector(".note-container").innerHTML = "";
      notesBuilder();
      descBuilder();
    } else {         //удаляем заметку из массива ту которая выделена и перерисовываем поля
      dataArr.splice(position, 1);
      position = 0;
      startNote = position;
      document.querySelector(".list-container").innerHTML = "";
      document.querySelector(".note-container").innerHTML = "";
      notesBuilder();
      descBuilder();
    }
  });
}


////поиск заметок, текст из инпут сравнивается с именами заметок в массиве
function finder () {
    const btn = document.querySelector('.find-btn');
    const input = document.querySelector('.finder');
    btn.addEventListener('click', () => { //поиск по кнопке лупа
        const notes = document.querySelectorAll('.note-title');
        notes.forEach((i) => {i.style.border = 'none';});
        if (input.value.length == 0) {console.log('null')}
        else {
            dataArr.forEach((i) => {
                if (i['name'].includes(input.value)) {
                   notes[dataArr.indexOf(i)].style.border = '4px solid yellow';
                }
            })
        }
        
    })

    input.addEventListener('keydown', (ev) => {   //поиск после нажатия enter
        const notes = document.querySelectorAll('.note-title');
        notes.forEach((i) => {i.style.border = 'none';});
        if (ev.keyCode === 13) {
            if (input.value.length == 0) {}
        else {
            dataArr.forEach((i) => {
                if (i['name'].includes(input.value)) {
                   notes[dataArr.indexOf(i)].style.border = '4px solid yellow';
                }
            })
        }
        }
    })
}

document.addEventListener("DOMContentLoaded", builder);

const BODY = document.querySelector("body");

//// массив с данными заметок
//let dataArr;
let dataArr = [
  {
    name: "Купить хлеб",
    info: "В определенном магазине, обязательно столичный",
    status: "2",
  },
  {
    name: "Решить задачу",
    info: "Очень сложная, но программирование это увлекательно!",
    status: "1",
  },
  {
    name: "Забрать посылку",
    info: "Возможна очередь!",
    status: "3",
  },
];

let position = 0;
let isNew = 0;
let statusArr = ["ожидает", "в процессе", "выполнена"];
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
  addBtn.innerText = "Новая";
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.innerText = "УДАЛИТЬ";
  const findArea = document.createElement("input");
  findArea.classList.add("finder");
  findArea.type = "text";
  findArea.placeholder = "Поиск";
  const findBtn = document.createElement("div");
  findBtn.classList.add("find-btn");
  findBtn.innerHTML = "&#128270;";

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  listContainer.style.width = "300px";
  const stripe = document.createElement("div");
  stripe.classList.add("stripe");
  const footer = document.createElement('footer');
  const gitLink = document.createElement('a');
  gitLink.classList.add('git-link');
  gitLink.href = 'https://github.com/Kosteksal';
  gitLink.innerHTML = 'GitHub';
  gitLink.target = 'blank'; 
  const footText = document.createElement('span');
  footText.classList.add('footer-text');
  footText.innerHTML = '2022';
  const main = document.createElement('div');
  main.classList.add('main');

  BODY.append(container);
  container.append(main);
  main.append(controls);
  main.append(wrapper);
  wrapper.append(listContainer);
  wrapper.append(stripe);
  wrapper.append(noteContainer);
  controls.append(mainTitle);
  controls.append(btnContainer);
  btnContainer.append(delBtn);
  btnContainer.append(addBtn);
  btnContainer.append(findArea);
  btnContainer.append(findBtn);
  container.append(footer);
  footer.append(gitLink);
  footer.append(footText);

  notesBuilder();

  descBuilder();

  newAdder();

  remover();

  finder();

  resizer();
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
  textArea.placeholder = 'Описание';
  const titleArea = document.createElement("textarea");
  titleArea.classList.add("title-text");
  titleArea.placeholder = 'Название';
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Cохранить";
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
  notes[startNote].style.borderRadius = "20px";
  notes.forEach((i) =>
    i.addEventListener("click", (event) => {
      position = event.target.id;
      document.querySelector(".note-container").innerHTML = ""; //перерисовка поля изменения в зависимости от выделенной заметки
      descBuilder();
      console.log(event.target.id);
      notes.forEach((e) => (e.style.border = "none"));
      event.target.style.border = "3px solid red";
      event.target.style.borderRadius = "20px";
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
  if (isNew === 1) {
    //если это новая заметка кноака save добавляет данные в массив с заметками
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
    textArea.placeholder = 'Описание';
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    textArea.classList.add("text");
    const titleArea = document.createElement("textarea");
    titleArea.classList.add("title-text");
    titleArea.placeholder = 'Название';
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save-btn");
    saveBtn.innerText = "Сохранить";
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
      event.target.style.border = "2px solid red";
      // descArea.append(saveBtn);
      //noteSaver();
    });
  });
}

////удаление заметки при нажатии кнопки delete
function remover() {
  const btn = document.querySelector(".del-btn");
  btn.addEventListener("click", (even) => {
    //если заметок не осталось оставляем одну пустую
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
    } else {
      //удаляем заметку из массива ту которая выделена и перерисовываем поля
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
function finder() {
  const btn = document.querySelector(".find-btn");
  const input = document.querySelector(".finder");
  btn.addEventListener("click", () => {
    //поиск по кнопке лупа
    const notes = document.querySelectorAll(".note-title");
    notes.forEach((i) => {
      i.style.border = "none";
    });
    if (input.value.length == 0) {
      console.log("null");
    } else {
      dataArr.forEach((i) => {
        if (i["name"].includes(input.value)) {
          notes[dataArr.indexOf(i)].style.border = "5px solid yellow";
          notes[dataArr.indexOf(i)].style.borderRadius = "20px";
        }
      });
    }
  });

  input.addEventListener("keydown", (ev) => {
    //поиск после нажатия enter
    const notes = document.querySelectorAll(".note-title");
    notes.forEach((i) => {
      i.style.border = "none";
    });
    if (ev.keyCode === 13) {
      if (input.value.length == 0) {
      } else {
        dataArr.forEach((i) => {
          if (i["name"].includes(input.value)) {
            notes[dataArr.indexOf(i)].style.border = "5px solid yellow";
            notes[dataArr.indexOf(i)].style.borderRadius = "20px";
          }
        });
      }
    }
  });
}

////изменение размера списка заметок мышкой
function resizer() {
  const stripe = document.querySelector(".stripe");
  const block = document.querySelector(".list-container");
  const wrapper = document.querySelector(".wrapper");
  let startPos;
  let blockPos;
  function mouseMover(event1) {
    // console.log(event1.clientX);
    // console.log(block.offsetWidth);
    block.style.width = `${blockPos + (event1.clientX - startPos)}px`;
  }
  stripe.addEventListener("mousedown", (eve) => {
    //console.log(eve.clientX);
    wrapper.addEventListener("mousemove", mouseMover);
    startPos = eve.clientX;
    blockPos = block.offsetWidth;
  });
  wrapper.addEventListener("mouseup", (even) => {
    // console.log("up");
    wrapper.removeEventListener("mousemove", mouseMover);
  });
}

////сохранение листа в local storage

window.addEventListener("beforeunload", () => {
  localStorage.setItem("list", JSON.stringify(dataArr));
});

window.addEventListener("load", () => {
  let storage = localStorage.getItem("list");
  let storageParse = JSON.parse(storage);
  if (storage == null) {
    console.log("no data in storage");
  } else {
    dataArr = storageParse;
    document.querySelector(".list-container").innerHTML = "";
    document.querySelector(".note-container").innerHTML = "";
    notesBuilder();
    descBuilder();
  }
});

document.addEventListener("DOMContentLoaded", builder);

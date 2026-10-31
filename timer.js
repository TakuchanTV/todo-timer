const input = document.getElementById("input");
const form = document.getElementById("form");
const upbutton = document.querySelectorAll(".up");
const downbutton = document.querySelectorAll(".down");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

const btn = document.getElementById("btn");
const div = document.getElementById("memodiv");
const ul = document.getElementById("ul");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const saveBtn = document.getElementById("savebtn");

let timerId;

let number = 0;
let hourstime = 0;
let minutestime = 0;
let secondstime = 0;

const one_Hours = 3600000;
const one_Minutes = 60000;
const one_Seconds = 1000;
const min_Count = 0;
const max_Count = 86400000;

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const audio = new Audio("TimerAudio.mp3");

let count = Number(
  hours.textContent + minutes.textContent + seconds.textContent,
);

let hh = Math.floor(count / one_Hours);
let mm = Math.floor((count % one_Hours) / one_Minutes);
let ss = Math.floor((count % one_Minutes) / one_Seconds);

hours.textContent = String(hh).padStart(2, "0");
minutes.textContent = String(mm).padStart(2, "0");
seconds.textContent = String(ss).padStart(2, "0");

if (
  hours.textContent === "00" &&
  minutes.textContent === "00" &&
  seconds.textContent === "00"
) {
  startBtn.disabled = true;
  stopBtn.disabled = true;
  // resetBtn.disabled = true;
}

const timerElements = document.querySelectorAll(".timer-text");

upbutton.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (index === 0) {
      const hoursValue = Number(hours.textContent) + 1;
      hours.textContent = String(hoursValue).padStart(2, "0");
      count = count + one_Hours;
      hh = Math.floor(count / one_Hours);
    } else if (index === 1) {
      const minutesValue = Number(minutes.textContent) + 1;
      minutes.textContent = String(minutesValue).padStart(2, "0");
      count = count + one_Minutes;
      hh = Math.floor(count / one_Hours);
      mm = Math.floor((count % one_Hours) / one_Minutes);
      ss = Math.floor((count % one_Minutes) / one_Seconds);

      if (mm === 0) {
        hours.textContent = String(hh).padStart(2, "0");
        minutes.textContent = String(mm).padStart(2, "0");
        seconds.textContent = "00";
        const SS = ss * 1000;
        count = count - SS;
      }
    } else {
      const secondsValue = Number(seconds.textContent) + 1;
      seconds.textContent = String(secondsValue).padStart(2, "0");
      count = count + one_Seconds;
      hh = Math.floor(count / one_Hours);
      mm = Math.floor((count % one_Hours) / one_Minutes);
      ss = Math.floor((count % one_Minutes) / one_Seconds);

      if (ss === 0) {
        hours.textContent = String(hh).padStart(2, "0");
        minutes.textContent = String(mm).padStart(2, "0");
        seconds.textContent = "00";
      }
    }

    if (
      hours.textContent === "00" &&
      minutes.textContent === "00" &&
      seconds.textContent === "00"
    ) {
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });
});

downbutton.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (index === 0) {
      if (hours.textContent > 0) {
        const hoursValue = Number(hours.textContent) - 1;
        hours.textContent = String(hoursValue).padStart(2, "0");
        count = count - one_Hours;
      }
    } else if (index === 1) {
      if (minutes.textContent > 0) {
        const minutesValue = Number(minutes.textContent) - 1;
        minutes.textContent = String(minutesValue).padStart(2, "0");
        count = count - one_Minutes;
      }
    } else {
      if (seconds.textContent > 0) {
        const secondsValue = Number(seconds.textContent) - 1;
        seconds.textContent = String(secondsValue).padStart(2, "0");
        count = count - one_Seconds;
        hh = Math.floor(count / one_Hours);
        mm = Math.floor((count % one_Hours) / one_Minutes);
        ss = Math.floor((count % one_Minutes) / one_Seconds);
      } else {
        if (ss === 0 && (hh > 0 || mm > 0)) {
          count = count - 1000;
          hh = Math.floor(count / one_Hours);
          mm = Math.floor((count % one_Hours) / one_Minutes);
          ss = Math.floor((count % one_Minutes) / one_Seconds);

          hours.textContent = String(hh).padStart(2, "0");
          minutes.textContent = String(mm).padStart(2, "0");
          seconds.textContent = String(ss).padStart(2, "0");
        }
      }
    }

    if (
      hours.textContent === "00" &&
      minutes.textContent === "00" &&
      seconds.textContent === "00"
    ) {
      startBtn.disabled = true;
      resetBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;

  timerId = setInterval(() => {
    count = count - 1000;
    hh = Math.floor(count / one_Hours);
    mm = Math.floor((count % one_Hours) / one_Minutes);
    ss = Math.floor((count % one_Minutes) / one_Seconds);

    if (
      hours.textContent === "00" &&
      minutes.textContent === "00" &&
      seconds.textContent === "00"
    ) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];

      console.log(todos);

      if (todos.length > 0) {
        audio.loop = true;
        audio.play();
        alert(todos[0]);
        todos.shift();
        localStorage.setItem("todos", JSON.stringify(todos));
        // audio.pause();
      } else {
        audio.loop = true;
        audio.play();
      }

      startBtn.disabled = true;
      stopBtn.disabled = true;
      // resetBtn.disabled = true;
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      clearInterval(timerId);
      count = 0;
      return;
    }

    hours.textContent = String(hh).padStart(2, "0");
    minutes.textContent = String(mm).padStart(2, "0");
    seconds.textContent = String(ss).padStart(2, "0");
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
});

resetBtn.addEventListener("click", () => {
  // resetBtn.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = true;
  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";
  clearInterval(timerId);
  count = 0;
  audio.pause();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addText();
});

saveBtn.addEventListener("click", () => {
  saveText();
});

const addText = (todo) => {
  let todoText = input.value;

  if (todo) {
    todoText = todo;
  }

  if (todoText) {
    const li = document.createElement("li");
    setupDragEvents(li);
    const span = document.createElement("span");
    span.textContent = todoText;
    const btn = document.createElement("button");
    btn.textContent = "削除";
    btn.classList.add("delete-button");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      li.remove();
      btn.remove();
      saveText();
    });

    li.appendChild(span);
    ul.appendChild(li);
    li.appendChild(btn);
    li.draggable = true;
    input.value = "";
    console.log(todos);
    saveText();
  }
};

const saveText = () => {
  // const li = document.querySelectorAll("li")
  const spans = document.querySelectorAll("li span");
  let todos = [];

  spans.forEach((element) => {
    todos.push(element.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

if (todos) {
  todos.forEach((todo) => {
    addText(todo);
  });
}

function setupDragEvents(li) {
  li.id = crypto.randomUUID();

  li.draggable = true;
  li.addEventListener("dragstart", onDragStart);
  li.addEventListener("drop", onDrop);
  li.addEventListener("dragover", onDragover);
  li.addEventListener("dragenter", onDragenter);
  li.addEventListener("dragleave", onDragleave);
}

function onDragStart(event) {
  event.dataTransfer.setData("text", event.currentTarget.id);
}

function onDrop(event) {
  event.preventDefault();

  // ドラッグ中のliのidを取得
  const draggedId = event.dataTransfer.getData("text");

  // ドラッグ中のli要素を取得
  const draggedElement = document.getElementById(draggedId);

  // ドロップ先のli要素
  const targetElement = event.currentTarget;

  // 自分自身にドロップした場合は何もしない
  if (draggedElement === targetElement) {
    return;
  }

  // ドロップ先の位置情報
  const rect = targetElement.getBoundingClientRect();

  // liの中心位置
  const middleY = rect.top + rect.height / 2;

  // マウスカーソルのY座標
  const mouseY = event.clientY;

  // 上半分なら前に挿入
  if (mouseY < middleY) {
    targetElement.before(draggedElement);
  }
  // 下半分なら後ろに挿入
  else {
    targetElement.after(draggedElement);
  }

  targetElement.classList.remove("dragging");

  // 並び順を保存
  saveText();
}

function onDragenter(event) {
  event.currentTarget.classList.add("dragging");
}

function onDragleave(event) {
  event.currentTarget.classList.remove("dragging");
}

function onDragover(event) {
  event.preventDefault();
}

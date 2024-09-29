//banner star
const header = document.querySelector("header");
const hotEvent = document.querySelector(".hotEvent");
const heroSticky = (entries) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) header.classList.add("hero__sticky");
  else header.classList.remove("hero__sticky");
};
const headerObserver = new IntersectionObserver(heroSticky, {
  root: null,
  threshold: 0,
  rootMargin: "-660px",
});
headerObserver.observe(hotEvent);
//banner end

//hamburger start
const navigation = document.querySelector("nav");
document.querySelector(".hamburger").onclick = function () {
  this.classList.toggle("hamburger__open");
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
  navigation.classList.toggle("nav__open");
};
//hamburger end
//calendar start
const daysContainer = document.querySelector(".calendar__days");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const todayBtn = document.querySelector(".today");
const month = document.querySelector(".calendar__monthTitle");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const renderCalendar = () => {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let days = "";

  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="calendar__day calendar__day--prev">${
      prevLastDayDate - x + 1
    }</div>`;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      days += `<div class="calendar__day calendar__day--today">${i}</div>`;
    } else {
      days += `<div class="calendar__day">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="calendar__day calendar__day--next">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  hideTodayBtn();
};

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

todayBtn.addEventListener("click", () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
});

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

renderCalendar();
//calendar end

//calendar event display start
const eventDays = document.querySelectorAll(".calendar__day");
const hotEvents = document.querySelector(".hotEvent__event");

eventDays.forEach((eventDay) => {
  eventDay.addEventListener("mouseover", () => {
    const day = eventDay.textContent;
    const currentDate = new Date();
    currentDate.setDate(day); // 設置當前日期為滑鼠移入的日期

    const dayOfWeek = currentDate.getDay(); // 取得星期幾 (0 是星期日, 6 是星期六)
    let hotEvent;

    if (dayOfWeek === 6 || dayOfWeek === 0) {
      // 如果是星期六或星期日
      hotEvent = `
        <h1 class="event__day">週末特別活動</h1>
        <div class="event__seperator"></div>
        <h2 class="event__title">水上樂園</h2>
        <p class="event__time"><i class="fas fa-clock"></i>活動時間: 10:00-16:00</p>
        <p class="event__location"><i class="fas fa-location-arrow"></i>地點: 水上樂園區</p>
        <p class="event__others">*歡迎全家參加</p>
      `;
    } else {
      // 如果是平日
      hotEvent = `
        <h1 class="event__day">${day}日活動</h1>
        <div class="event__seperator"></div>
        <h2 class="event__title">獅子跳火圈</h2>
        <p class="event__time"><i class="fas fa-clock"></i>第一場次: 09:00-11:00</p>
        <p class="event__time"><i class="fas fa-clock"></i>第二場次: 13:00-15:00</p>
        <p class="event__location"><i class="fas fa-location-arrow"></i>地點: 非洲動物園區</p>
        <p class="event__others">*盡請把握時間觀賞</p>
      `;
    }

    hotEvents.innerHTML = hotEvent; // 更新熱點活動資訊
  });

  eventDay.addEventListener("mouseout", () => {
    // 當滑鼠移出時恢復預設的活動資訊
    hotEvents.innerHTML = `
      <h1 class="event__day">今日活動</h1>
      <div class="event__seperator"></div>
      <h2 class="event__title">獅子跳火圈</h2>
      <p class="event__time"><i class="fas fa-clock"></i>第一場次: 09:00-11:00</p>
      <p class="event__time"><i class="fas fa-clock"></i>第二場次: 13:00-15:00</p>
      <p class="event__location"><i class="fas fa-location-arrow"></i>地點: 非洲動物園區</p>
      <p class="event__others">*盡請把握時間觀賞</p>
    `;
  });
});

//calendar event display end

const tabs = Array.from(document.querySelectorAll(".day-tab"));
const panels = Array.from(document.querySelectorAll(".event-panel"));
const timedSlides = Array.from(document.querySelectorAll(".timed-slide"));

function activateTab(tab) {
  const panelId = tab.getAttribute("aria-controls");

  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });

  panels.forEach((panel) => {
    const active = panel.id === panelId;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (tabs.indexOf(tab) + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

function updateTimedSlides() {
  const now = new Date();

  timedSlides.forEach((link) => {
    const releaseAt = new Date(link.dataset.releaseAt);
    const locked = now < releaseAt;
    link.classList.toggle("is-locked", locked);
    link.setAttribute("aria-disabled", String(locked));
    link.href = locked ? "#" : link.dataset.downloadUrl;
  });
}

timedSlides.forEach((link) => {
  link.addEventListener("click", (event) => {
    const releaseAt = new Date(link.dataset.releaseAt);
    if (new Date() >= releaseAt) return;
    event.preventDefault();
    alert("2일차 발표자료는 2026년 7월 30일(목) 12시부터 다운로드 가능합니다.");
  });
});

updateTimedSlides();
setInterval(updateTimedSlides, 30000);

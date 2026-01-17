//INTRO EFFECTS
window.addEventListener("scroll", () => {
  const yOffset = window.scrollY;
  document.querySelector(".sky").style.backgroundPosition =
    `center ${0 - yOffset * 0.1}px`;
});

window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  intro.classList.add('show');

  const startWords = () => intro.classList.add('animate');
  if (getComputedStyle(intro).transitionDuration !== '0s') {
    intro.addEventListener('transitionend', startWords, { once: true });
  } else {
    startWords();
  }

  const BOB_MS = 2600;
  const EXIT_MS = 900;

  const startExit = () => {
    intro.classList.add('fly');
    setTimeout(() => intro.remove(), EXIT_MS + 250);
  };

  const t = setTimeout(startExit, BOB_MS);
  ['click', 'keydown', 'scroll', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, () => { clearTimeout(t); startExit(); }, { once: true })
  );
});




// Kean title effect

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.title-effect .wrd-effect').forEach(span => {
    span.addEventListener('animationend', (e) => {
      // ensure we're reacting only to the 'drop' animation ending
      if (e.animationName === 'drop') {
        span.classList.add('landed');
      }
    });
  });
});



// Set the date/time of the hackathon
const eventDate = new Date("April 25, 2026 08:00:00").getTime();

const countdown = setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output to HTML
  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");

  // When event passes
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "The hackathon has started!";
  }
}, 1000);

// --- SCHEDULE TIMELINE LOGIC ---

// --- SCHEDULE TIMELINE LOGIC ---

const scheduleData = {
  1: [
    { title: "Welcome & Check-In 🐾", time: "8:00 AM", loc: "STEM Building", desc: "Arrival, breakfast, and get settled in. Pick up your badges and swag!" },
    { title: "Opening Ceremony 🎙️", time: "9:00 AM", loc: "Auditorium", desc: "Intro, rules, and announcements to kick off the event." },
    { title: "Team Formation 🤝", time: "9:30 AM", loc: "Lobby", desc: "Form teams and brainstorm ideas." },
    { title: "Hacking Begins 💻", time: "10:00 AM", loc: "Hacking Area", desc: "Coding, planning, and prototyping starts NOW!" },
    { title: "Sponsor Expo (Group A) 💼", time: "11:00 AM", loc: "Expo Hall", desc: "Group A meets with companies in rotating time blocks." },
    { title: "Sponsor Expo (Group B) 💼", time: "12:00 PM", loc: "Expo Hall", desc: "Group B meets with companies in rotating time blocks." },
    { title: "Lunch & Workshop 1 🍕", time: "12:30 PM", loc: "Cafeteria / Room 101", desc: "Fuel up! 1-hour workshop blocks running alongside lunch." },
    { title: "Workshop 2 🛠️", time: "1:30 PM", loc: "Room 102", desc: "Learn new skills to level up your project." },
    { title: "Workshop 3 🎨", time: "2:30 PM", loc: "Room 103", desc: "Another opportunity to learn something cool." },
    { title: "Career Expo Ends 👋", time: "3:00 PM", loc: "Expo Hall", desc: "Say thank you to our amazing sponsors!" },
    { title: "Social Break 🍦", time: "4:00 PM", loc: "Lounge", desc: "Light refreshments, snacks, and fun activities to de-stress." },
    { title: "Pizza Dinner 🍕", time: "7:00 PM", loc: "Cafeteria", desc: "1 pie per team! Regroup, refuel, and prepare for the long night." },
    { title: "Workshops & Hacking 🌙", time: "8:00 PM", loc: "Hacking Area", desc: "Optional technical workshops + strong hacking focus." },
    { title: "Overnight Hacking 🦉", time: "10:00 PM", loc: "Everywhere", desc: "Hacking continues! Snacks, coffee, and mentors available for debugging." },
  ],
  2: [
    { title: "Final Stretch ☕", time: "5:00 AM", loc: "Hacking Area", desc: "Teams polish presentations, finalize demos, and submit projects." },
    { title: "Judging & Closing 🏆", time: "7:00 AM", loc: "Auditorium", desc: "Team pitches to judges, winners announced, and group photos!" },
    { title: "Event Ends 👋", time: "8:00 AM", loc: "STEM Building", desc: "Head home, sleep, and celebrate an amazing 24 hours!" },
  ]
};

let currentDay = 1;
let activeEventIndex = 0;

function renderTimeline() {
  const events = scheduleData[currentDay];
  const dotsContainer = document.getElementById('timeline-dots');

  if (!dotsContainer) return; // Safety check

  dotsContainer.innerHTML = ''; // Clear existing

  events.forEach((event, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('timeline-dot-wrapper');
    if (index === activeEventIndex) wrapper.classList.add('active');

    wrapper.innerHTML = `<div class="timeline-dot"></div>
      <div class="dot-time">${event.time}</div>`;

    wrapper.addEventListener('click', () => {
      setActiveEvent(index);
    });

    dotsContainer.appendChild(wrapper);
  });
}

function setActiveEvent(index) {
  const events = scheduleData[currentDay];
  if (index < 0 || index >= events.length) return;

  activeEventIndex = index;

  // Update Card
  const event = events[index];
  const titleEl = document.getElementById('event-title');
  const timeEl = document.getElementById('event-time');
  const locEl = document.getElementById('event-loc');
  const descEl = document.getElementById('event-desc');

  if (titleEl && timeEl && locEl && descEl) {
    // Simple fade transition
    const card = document.querySelector('.event-card');
    if (card) {
      card.style.opacity = 0;
      card.style.transform = "translateY(10px)";

      setTimeout(() => {
        titleEl.textContent = event.title;
        timeEl.textContent = event.time;
        locEl.textContent = event.loc;
        descEl.textContent = event.desc;

        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      }, 300);
    } else {
      // Fallback if card class missing
      titleEl.textContent = event.title;
      timeEl.textContent = event.time;
      locEl.textContent = event.loc;
      descEl.textContent = event.desc;
    }
  }

  // Update Dots
  document.querySelectorAll('.timeline-dot-wrapper').forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Initial Render
  renderTimeline();
  setActiveEvent(0);

  // Event Listeners for Nav Arrows
  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeEventIndex > 0) setActiveEvent(activeEventIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const max = scheduleData[currentDay].length - 1;
      if (activeEventIndex < max) setActiveEvent(activeEventIndex + 1);
    });
  }

  // Day Switching
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const day = parseInt(e.target.dataset.day);
      if (day === currentDay) return;

      currentDay = day;
      activeEventIndex = 0; // Reset to first event of the day

      // Update active button
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Update Date Text
      const dateEl = document.getElementById('schedule-date');
      if (dateEl) {
        if (currentDay === 1) {
          dateEl.textContent = "Saturday, April 25, 2026";
        } else {
          dateEl.textContent = "Sunday, April 26, 2026";
        }
      }

      renderTimeline();
      setActiveEvent(0);
    });
  });

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  console.log("FAQ Items found:", faqItems.length);

  faqItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      console.log("FAQ item clicked:", idx);
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      const isActive = item.classList.toggle('active');
      console.log("Item active state:", isActive);
    });
  });

  // TRACKS Card Logic
  const trackCards = document.querySelectorAll('.card-container');
  trackCards.forEach(card => {
    card.addEventListener('click', () => {
      // Close others
      trackCards.forEach(c => {
        if (c !== card) {
          c.classList.remove('active');
        }
      });
      // Toggle current
      card.classList.toggle('active');
    });
  });
});

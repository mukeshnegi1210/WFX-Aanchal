document.addEventListener("DOMContentLoaded", () => {
  // Select all video containers
  const videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach((container) => {
    const video = container.querySelector("video");
    const playButton = container.querySelector(".playButton");

    // Play video on button click and add controls
    playButton.addEventListener("click", () => {
      video.play();
      video.setAttribute("controls", "controls");
      playButton.style.display = "none"; // Hide play button
    });

    // Remove controls and show play button when video is paused or ends
    video.addEventListener("pause", () => {
      video.removeAttribute("controls");
      playButton.style.display = "block";
    });

    video.addEventListener("ended", () => {
      video.removeAttribute("controls");
      playButton.style.display = "block";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".faq-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const target = document.querySelector(targetId);

      if (target.classList.contains("show")) {
        target.classList.remove("show");
      } else {
        // Close any open FAQ first (accordion behavior)
        document
          .querySelectorAll(".faq-collapse.show")
          .forEach((openTarget) => {
            openTarget.classList.remove("show");
          });

        // Open the clicked FAQ
        target.classList.add("show");
      }
    });
  });
});

// Tabs
document.addEventListener("DOMContentLoaded", function () {
  // Prevent submenu from closing on tab click
  const dropdownTabs = document.querySelectorAll(".dropdown-menu .tab-link");

  dropdownTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent the click event from propagating to the dropdown
    });
  });

  // Initialize tabs
  function initializeTabs(wrapperClass) {
    const wrappers = document.querySelectorAll(wrapperClass);

    wrappers.forEach((wrapper) => {
      const tabLinks = wrapper.querySelectorAll(".tab-link");
      const tabPanes = wrapper.querySelectorAll(".tab-pane");

      tabLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          // Remove active class from all tabs and panes
          tabLinks.forEach((tab) =>
            tab.parentElement.classList.remove("active")
          );
          tabPanes.forEach((pane) => pane.classList.remove("active"));

          // Add active class to clicked tab and corresponding pane
          const targetId = this.getAttribute("href").substring(1); // Get the ID
          const targetPane = wrapper.querySelector(`#${targetId}`);

          this.parentElement.classList.add("active"); // Activate tab
          targetPane.classList.add("active"); // Activate pane
        });
      });
    });
  }

  // Initialize tabs for the class "tabs-wrapper"
  initializeTabs(".tabs-wrapper");
});

// Dynamic
// List of badges to display
const badges = [
  "Highly configurable",
  "User-friendly",
  "End-to-End Integrated",
  "AI-enabled",
  "100% cloud-based",
];

// Function to render badges dynamically
function renderBadges(badgeList) {
  const container = document.getElementById("badges-container");
  container.innerHTML = ""; // Clear existing badges
  badgeList.forEach((badge) => {
    const badgeElement = document.createElement("div");
    badgeElement.className = "badge";
    badgeElement.innerHTML = `
      <img src="../assets/img/charm_circle-tick.svg" alt="circle tick">
      <span>${badge}</span>
    `;
    container.appendChild(badgeElement);
  });
}

// Render the badges
renderBadges(badges);

// Why choose dynamic
const data = {
  cards: [
    { img: "../assets/img/whychoose1.svg", heading: "100% Cloud", text: "Access the PLM anytime, anywhere with our fully browser-based platform." },
    { img: "../assets/img/whychoose2.svg", heading: "Visual Interface", text: "Experience a modern, highly visual interface that boosts productivity." },
    { img: "../assets/img/whychoose3.svg", heading: "Faster Adoption", text: "Get up and running quickly with intuitive, easy-to-use features." },
    { img: "../assets/img/whychoose4.svg", heading: "Vendor Portal", text: "Streamline supplier communication with our integrated vendor portal." },
    { img: "../assets/img/whychoose5.svg", heading: "Timer & Action", text: "Save time with automated workflows and critical path management." },
    { img: "../assets/img/whychoose6.svg", heading: "Milestone Alerts", text: "Stay on track with real-time alerts for key project milestones." },
    { img: "../assets/img/whychoose7.svg", heading: "Mobile Apps", text: "Manage your product lifecycle on the go with our powerful mobile apps." },
    { img: "../assets/img/whychoose8.svg", heading: "Data Security", text: "Protect your sensitive data with our robust security measures." }
  ],
  fasterTimeToMarket: "XX% Faster Time-to-Market."
};

function renderCards(cards) {
  const container = document.getElementById('whyChooseCards');
  container.innerHTML = cards.map(card => `
        <div class="whyc_cols">
            <div class="whychoose_card1">
                <img src="${card.img}" alt="${card.heading}">
                <h3 class="whychoose_cards_heading">${card.heading}</h3>
                <p class="mb-0 whc_pera">${card.text}</p>
            </div>
        </div>
    `).join('');
}

function renderFooterLabel(label) {
  document.getElementById('fasterTimeToMarket').innerText = label;
}

function bookDemo() {
  alert('Demo booked successfully!');
}

// Initialize the section dynamically
renderCards(data.cards);
renderFooterLabel(data.fasterTimeToMarket)
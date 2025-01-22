const slider = document.getElementById("slider");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

let currentIndex = 0;
let cardWidth = slider.children[0].offsetWidth;
let totalCards = slider.children.length;
let visibleCards = 4; // Default number of visible cards

// Function to update visibleCards based on screen size
const updateVisibleCards = () => {
  if (window.innerWidth <= 768) {
    // Example for mobile breakpoint
    visibleCards = 1;
  } else {
    visibleCards = 4; // Default for larger screens
  }
  cardWidth = slider.children[0].offsetWidth; // Recalculate card width
  currentIndex = Math.min(currentIndex, totalCards - visibleCards); // Adjust currentIndex
  slider.style.transform = `translateX(-${(currentIndex * cardWidth)+5}px)`; // Adjust slider position
};

// Event listeners for arrows
prevArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(-${(currentIndex * cardWidth)+15}px)`;
  }
});

nextArrow.addEventListener("click", () => {
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    slider.style.transform = `translateX(-${(currentIndex * cardWidth)+15}px)`;
  }
});

// Event listener for window resize to adjust visible cards
window.addEventListener("resize", updateVisibleCards);

// Initial setup
updateVisibleCards();

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
document.addEventListener("DOMContentLoaded", () => {
  const megaMenu = document.getElementById("megaMenu");
  megaMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevents closing the menu on inner clicks
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

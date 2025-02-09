const slider = document.getElementById("slider");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");
const dotsContainer = document.getElementById("dotsContainer");

let currentIndex = 0;
let cardWidth = slider.children[0].offsetWidth;
let totalCards = slider.children.length;
let visibleCards = 4; // Default number of visible cards
let originalCards = totalCards; // Store the original card count

// Clone first and last set of cards for seamless looping
const cloneFirst = [...slider.children].slice(0, visibleCards).map(card => card.cloneNode(true));
const cloneLast = [...slider.children].slice(-visibleCards).map(card => card.cloneNode(true));
cloneFirst.forEach(card => slider.appendChild(card)); // Add clones to the end
cloneLast.reverse().forEach(card => slider.prepend(card)); // Add clones to the start

// Update totalCards to include cloned elements
totalCards = slider.children.length;

// Adjust the slider position to start at the "first" real card
slider.style.transform = `translateX(-${visibleCards * cardWidth}px)`;

// Function to update visibleCards based on screen size
const updateVisibleCards = () => {
  if (window.innerWidth <= 768) {
    visibleCards = 1; // Mobile view
  } else {
    visibleCards = 4; // Default for larger screens
  }
  cardWidth = slider.children[0].offsetWidth; // Recalculate card width
  currentIndex = Math.min(currentIndex, totalCards - visibleCards * 2);
  slider.style.transition = "none"; // Prevent transition during adjustment
  slider.style.transform = `translateX(-${(currentIndex + visibleCards) * cardWidth}px)`;
};

// Create dots
const createDots = () => {
  dotsContainer.innerHTML = ""; // Clear previous dots
  for (let i = 0; i < originalCards; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active"); // First dot is active
    dot.dataset.index = i;
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
};

// Update active dot
const updateDots = () => {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
};

// Function to update slider position and dots
const updateSlider = () => {
  slider.style.transition = "transform 0.3s ease-in-out";
  slider.style.transform = `translateX(-${(currentIndex + visibleCards) * cardWidth}px)`;
  updateDots();
};

// Event listeners for arrows
prevArrow.addEventListener("click", () => {
  if (currentIndex > -visibleCards) {
    currentIndex--;
  } else {
    currentIndex = totalCards - visibleCards * 2 - 1;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${(currentIndex + visibleCards) * cardWidth}px)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.3s ease-in-out";
      currentIndex--;
      updateSlider();
    }, 50);
    return;
  }
  updateSlider();
});

nextArrow.addEventListener("click", () => {
  if (currentIndex < totalCards - visibleCards * 2) {
    currentIndex++;
  } else {
    currentIndex = 0;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${visibleCards * cardWidth}px)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.3s ease-in-out";
      currentIndex++;
      updateSlider();
    }, 50);
    return;
  }
  updateSlider();
});

// Update on resize
window.addEventListener("resize", updateVisibleCards);

// Initialize
updateVisibleCards();
createDots();


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

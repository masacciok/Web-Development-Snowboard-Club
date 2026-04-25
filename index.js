/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    // This section will run whenever the button is clicked
    document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
let submitButton = document.getElementById("rsvp-button");

const addParticipant = (person) => {
  // event.preventDefault();

  // Step 2: Write your code to manipulate the DOM here
  const name = person.name;
  const hometown = person.hometown;
  const email = person.email;

  if (!name || !hometown || !email) {
  alert("Please fill out all fields!");
  document.getElementById("rsvp-form").reset();
  return;
  }

  const para = document.createElement("p");
  para.textContent = `🎟️ ${name} from ${hometown}.`;
  const participant = document.querySelector(".rsvp-participants")
  participant.appendChild(para);
  document.getElementById("rsvp-form").reset();

}

// Step 3: Add a click event listener to the submit RSVP button here
// submitButton.addEventListener("click", addParticipant)

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

***/

const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value.trim(),
    hometown: rsvpInputs[1].value.trim(),
    email: rsvpInputs[2].value.trim()
  };

  if (person.name.length < 2) {
    containsErrors = true;
    rsvpInputs[0].classList.add("error");
  } else {
    rsvpInputs[0].classList.remove("error");
  }

  if (person.hometown.length < 2) {
    containsErrors = true;
    rsvpInputs[1].classList.add("error");
  } else {
    rsvpInputs[1].classList.remove("error");
  }

  if (person.email.length < 2 || !person.email.includes("@")) {
    containsErrors = true;
    rsvpInputs[2].classList.add("error");
  } else {
    rsvpInputs[2].classList.remove("error");
  }
  
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);
    // Optional: clear inputs
    for (let i = 0; i < rsvpInputs.length; i++) {
      let input = rsvpInputs[i];
      if (input.tagName !== "BUTTON") {
        input.value = "";
      }
    }
  }
  return containsErrors;
}

submitButton.addEventListener("click", validateForm);

/*** Animations/
 ***/
let animationInterval = null; // global

/*** Modal ***
  Purpose:
  - Use this starter code to add a pop-up modal to your website.
***/

const toggleModal = (person) => {
  const modal = document.getElementById("success-modal");
  const modalContent = document.getElementById("modal-text");

  // Show modal
  modal.style.display = "flex";

  // Update text
  modalContent.textContent = `Thanks for your RSVP, ${person.name}!`;

  // Prevent multiple intervals
  if (animationInterval) {
    clearInterval(animationInterval);
  }

  animationInterval = setInterval(animateImage, 500);

  // Hide modal after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";

    clearInterval(animationInterval);
    animationInterval = null;

    // Reset rotation (nice polish)
    const modalImage = document.getElementById("modal-image");
    modalImage.style.transform = "rotate(0deg)";
  }, 5000);
};

const closeModalBtn = document.getElementById("close-modal-btn");
const closeModal = () => {
  const modal = document.getElementById("success-modal");

  modal.style.display = "none";

  // Stop animation if running
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }

  // Reset image rotation (clean UX)
  const modalImage = document.getElementById("modal-image");
  modalImage.style.transform = "rotate(0deg)";
};
closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  const modal = document.getElementById("success-modal");
  if (event.target === modal) {
    closeModal();
  }
});
// animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.getElementById("modal-image");

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}
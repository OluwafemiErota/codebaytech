document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      courseOfChoice: document.getElementById("courseOfChoice").value,
      referralSource: document.getElementById("referralSource").value,
    };

    // Function to generate a random 3-letter string
    function generateRandomString(length) {
      const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    // Generate a unique reference ID
    const referenceId =
      "REF" +
      Math.floor(Math.random() * 1000000) +
      generateRandomString(3) +
      Math.floor(Math.random() * 1000000) +
      generateRandomString(5);

    // Send form data to the backend using Fetch API
    fetch("/just-gee-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, referenceId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to payment page with reference ID
          window.location.href = `/payment?referenceId=${referenceId}`;
        } else {
          alert(
            "There was an error processing your request. Please try again."
          );
        }
      })
      .catch((error) => console.error("Error:", error));
  });

// Array of Nigeria states
const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory",
];

// Reference to the select element
const stateSelect = document.getElementById("state");

// Function to populate the select element with options
function populateStates() {
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}
populateStates();

// Get the modal section

const modal = document.getElementById("popupForm");

const openBtns = document.querySelectorAll(".openPopupBtn");

const closeBtn = document.getElementById("closePopupBtn");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  modal.setAttribute("aria-hidden", "false");
}

// Add click event listeners to all buttons
openBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  modal.setAttribute("aria-hidden", "true");
}

closeBtn.onclick = closeModal;
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

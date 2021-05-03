const form = document.getElementById("form");
const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const zip = document.getElementById("zip");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const contactMethod = document.getElementById("contactMethod");
const paymentType = document.getElementById("paymentType");
const paymentFrequency = document.getElementById("paymentFrequency");
const paymentAmount = document.getElementById("paymentAmount");
const comments = document.getElementById("comments");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForm();
});

const checkForm = () => {
  const lastNameVal = lastName.value.trim();
  const firstNameVal = firstName.value.trim();
  const addressVal = address.value.trim();
  const cityVal = city.value.trim();
  const stateVal = state.value.trim();
  const countryVal = country.value.trim();
  const zipVal = zip.value.trim();
  const phoneNumberVal = phoneNumber.value.trim();
  const emailVal = email.value.trim();
  const contactMethodVal = contactMethod.value.trim();
  const paymentTypeVal = paymentType.value.trim();
  const paymentFrequencyVal = paymentFrequency.value.trim();
  const paymentAmountVal = paymentAmount.value.trim();
  const commentsVal = comments.value.trim();
  let formData = {
    last_name: lastNameVal,
    first_name: firstNameVal,
    street_address: addressVal,
    city: cityVal,
    state_region: stateVal,
    country: countryVal,
    zip: zipVal,
    phone: phoneNumberVal,
    email: emailVal,
    contact: contactMethodVal,
    payment_type: paymentTypeVal,
    payment_frequency: paymentFrequencyVal,
    payment_amount: paymentAmountVal,
    comments: commentsVal,
  };
  if (lastNameVal === "") {
    formError(lastName, "Please enter a last name");
    return;
  } else {
    formErrorFixed(lastName);
  }

  if (firstNameVal === "") {
    formError(firstName, "Please enter a first name");
    return;
  } else {
    formErrorFixed(firstName);
  }

  if (addressVal === "") {
    formError(address, "Please enter a valid street address");
    return;
  } else {
    formErrorFixed(address);
  }

  if (cityVal === "") {
    formError(city, "Please enter a City");
    return;
  } else {
    formErrorFixed(city);
  }

  if (stateVal === "") {
    formError(state, "Please enter a State or Region");
    return;
  } else {
    formErrorFixed(state);
  }

  if (countryVal === "selectCountry") {
    formError(country, "Please select your Country from the list");
    return;
  } else {
    formErrorFixed(country);
  }

  if (zipVal === "") {
    formError(zip, "Please enter a postal code");
    return;
  } else {
    formErrorFixed(zip);
  }

  if (phoneNumberVal === "") {
    formError(phoneNumber, "Please enter a phone number");
    return;
  } else {
    formErrorFixed(phoneNumber);
  }

  if (emailVal === "") {
    formError(email, "Please enter an email");
    return;
  } else if (!emailValid(emailVal)) {
    formError(email, "Email must be a valid format eg. someone@something.com");
    return;
  } else {
    formErrorFixed(email);
  }

  if (contactMethodVal === "notSelected") {
    formError(contactMethod, "Please make a selection");
    return;
  } else {
    formErrorFixed(contactMethod);
  }

  if (paymentTypeVal === "notSelected") {
    formError(paymentType, "Please make a selection");
    return;
  } else {
    formErrorFixed(paymentType);
  }

  if (paymentFrequencyVal === "notSelected") {
    formError(paymentFrequency, "Please make a selection");
    return;
  } else {
    formErrorFixed(paymentFrequency);
  }

  if (paymentAmountVal === "notSelected") {
    formError(paymentAmount, "Please make a selection");
    return;
  } else {
    formErrorFixed(paymentAmount);
  }

  confirmationModal(formData);
};

let confirmationModal = (data) => {
  let html = `
      <div>
      <h2> Please confirm your entries</h2>
      <p>Last name: ${data.last_name}</p>
      <p>First name: ${data.first_name} </p>
      <p>Address: ${data.street_address} </p>
      <p>City: ${data.city} </p>
      <p>State/Region: ${data.state_region} </p>
      <p>Country: ${data.country} </p>
      <p>Postal Code: ${data.zip} </p>
      <p>Phone: ${data.phone} </p>
      <p>Email: ${data.email}</p>
      <p>Contact method: ${data.contact}</p>
      <p>Payment Type: ${data.payment_type}</p>
      <p>Donation Frequency: ${data.payment_frequency}</p>
      <p>Donation Amount: ${data.payment_amount}</p>
      <p>Comments: ${data.comments}</p>
      <button type="submit" id="post">Submit</button>
      <button type="submit" id="cancelsubmit">Cancel</button>
      </div>
      `;
  let template = document.createElement("div");
  template.innerHTML = html;
  document.querySelector("#modalContent").appendChild(template);
  modal.classList.add("modal-active");
  let sendData = document.getElementById("post");
  sendData.addEventListener("click", (e) => {
    e.preventDefault();
    postFormData(data);
  });
  let cancelsubmit = document.getElementById("cancelsubmit");
  cancelsubmit.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/cancel.html";
  });
};

let postFormData = (data) => {
  fetch(`http://localhost:3000/donors`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  window.location.href = "/thankyou.html";
};

let formError = (input, message) => {
  let errorHandling = input.parentElement;
  let small = errorHandling.querySelector("small");
  small.innerText = message;
  errorHandling.className = "info error-handling error";
};

let formErrorFixed = (input) => {
  let errorHandling = input.parentElement;
  errorHandling.className = "info error-handling";
};

let emailValid = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

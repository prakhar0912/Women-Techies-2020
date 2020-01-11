const packageName = 'updates';

// form fields
const updatesInputName = document.getElementById('updatesInputName');
const updatesInputEmail = document.getElementById('updatesInputEmail');
const updatesInputPhoneNumber = document.getElementById('updatesInputPhoneNumber');
const updatesInputRegistrationNumber = document.getElementById('updatesInputRegistrationNumber');
const updatesSubmitBtn = document.getElementById('updatesSubmitBtn');

// form validator
const constraints = {
  email: {
    presence: true,
    email: true,
  },
  name: {
    presence: true,
  },
  phoneNumber: {
    presence: true,
  },
  registrationNumber: {
    presence: true,
    format: /^1[2-9][a-zA-Z]{3}[0-9]{4}$/,
  },
};

const isValid = (data) => {
  const errs = validate(data, constraints);
  if (errs != undefined) {
    console.log('[Validation errors] ', errs);
    return false;
  }
  if (!validate.isNumber(parseInt(updatesInputPhoneNumber.value))) {
    console.log('[Validation errors] PhoneNumber invalid');
    return false;
  }
  return true;
};

const handleUpdates = (e) => {
  console.log('[Event] updatesSubmitBtn clicked');
  e.preventDefault();
  const data = {

    name: updatesInputName.value,
    email: updatesInputEmail.value,
    phoneNumber: updatesInputPhoneNumber.value,
    registrationNumber: updatesInputRegistrationNumber.value,
  };
  if (!isValid(data)) {
    alert('Invalid fields');
    return;
  }

  const settings = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    data,
  };


  fetch(`${config.URLBuilder(packageName)}`, settings)
    .then((response) => {
      console.log('Successfully submitted form');
      console.log(response);
    }).catch((err) => {
      alert('Error on submission');
      console.error(err);
    });
};
window.onload = () => {
  console.log(`[Package] ${packageName}`);
  updatesSubmitBtn.addEventListener('click', handleUpdates);
};
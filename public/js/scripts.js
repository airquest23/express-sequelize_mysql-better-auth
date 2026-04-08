/////////////////////////////////////////
////
function getFormData(e) {
  e.preventDefault();
  e.stopPropagation();
  const form = e.target;
  form.classList.add('was-validated');
  if (!form.checkValidity()) return null;
  return new FormData(form);
};

/////////////////////////////////////////
////
function swalConfirm(title, fnIfConfirmed) {
  let userLanguage = navigator.language || navigator.userLanguage;
  swal({
    title: title,
    text: userLanguage.includes('fr') ?
      'Êtes-vous sûr(e) ?' :
      'Are you sure?',
    icon: "warning",
    buttons: [userLanguage.includes('fr') ?
      'Annuler' :
      'Cancel', true],
    dangerMode: true,
  })
  .then((isConfirmed) => {
    if (!isConfirmed) return;
    fnIfConfirmed();
  });
};

/////////////////////////////////////////
////
async function handleSuccess(data, isSwal = false) {
  console.log(data);

  let userLanguage = navigator.language || navigator.userLanguage;
  const text = typeof data === "string" ? data :
    data && data.message && typeof data.message === "string" ? data.message :
    userLanguage.includes('fr') ?
    'L\'opération s\'est déroulée avec succès' :
    'The operation was successfull';
  
  if (isSwal) {
    await swal(
      userLanguage.includes('fr') ? 'Succès' : 'Success',
      text,
      "success"
    );
  }

  else {
    const form = document.getElementById("form");
    const success = document.createElement("div");
    success.className = "valid-feedback fst-italic fs-4 d-block";
    success.textContent = text;
    form.after(success);
    form.hidden = true;
  };
};

/////////////////////////////////////////
////
async function handleError(error, isSwal = false) {
  console.log(error);

  let userLanguage = navigator.language || navigator.userLanguage;
  let errorString = '';

  if (Array.isArray(error))
    errorString = parseErrorArray(error);

  else {
    if (typeof error === "string")
      errorString = error;
    
    else if (error?.error) {
      if (Array.isArray(error.error))
        errorString = parseErrorArray(error.error);
      else
        errorString = error.error;
    }

    else if (error?.message) {
      if (Array.isArray(error.message))
        errorString = parseErrorArray(error.message);
      else
        errorString = error.message;
    }
    
    else if (error?.status) {
      if (Array.isArray(error.status))
        errorString = parseErrorArray(error.status);
      else
        errorString = error.status;
    }
    
    else {
      try {
        errorString = JSON.stringify(error, null, 2);
      } catch(e) {
        console.error('Server error:', error);
        console.error('Client error trying to parse the server error:', e);
        errorString = 'Unknown error, please check the logs!';
      };
    };

    isSwal = true;
  };
  
  if (isSwal) {
    await swal(
      userLanguage.includes('fr') ? 'Erreur' : 'Error',
      errorString,
      "error"
    );
  }
  
  else {
    document.getElementById('errors').textContent = errorString;
    document.getElementById('errors').style.display = "block";
  };
};

/////////////////////////////////////////
////
function parseErrorArray(errorArray) {
  console.log(errorArray);
  
  if (!Array.isArray(errorArray))
    return errorArray.toString();

  return getLocalizedMessage(errorArray);
};

/////////////////////////////////////////
////
function getLocalizedMessage(value) {
  if (typeof value === "string")
    return value;
  
  let userLanguage = navigator.language || navigator.userLanguage;

  // If localized message is an array
  if (Array.isArray(value)) {
    if (userLanguage.includes('fr'))
      return value[0];
    else
      return value[1];
  };

  // If localized message is a string representation of an array
  try {
    let array = JSON.parse(value);

    if (!Array.isArray(array))
      throw new Error("");

    if (userLanguage.includes('fr'))
      return array[0];
    else
      return array[1];
  }

  catch {
    try {
      let result = JSON.stringify(value, null, 2);
      return result;
    }
    catch(e) {
      console.log('Server message:', value);
      console.log('Client error trying to parse the server message:', e);
      return 'Unknown response, please check the logs!';
    };
  };
};

/////////////////////////////////////////
////
function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

function isString(value) {
  return typeof value === "string";
};

function isBoolean(value) {
  return typeof value === "boolean";
};
export function validateInput(value) {
 if (value && value.length > 4)
   return ""
   else if (value && value.length > 0)
   return "Verður að vera 5 stafir eða meira"
}

export function validateTitle(value) {
 if (value && value.length > 2)
   return ""
   else if (value && value.length > 0)
   return "Verður að vera 3 stafir eða meira"
}


export function validateAddress(value) {
  var re = /^[A-Za-zÁÉÍÓÚÆÐáéíóúæð]+\s\d+/;
 if (value && value.length > 3 && re.test(value))
   return ""
   else if (value && value.length > 0 && (value.length < 4 || !re.test(value)))
   return "Verður að vera gilt heimilisfang"
}

export function validatePassword(newValue, value) {
 if (value != newValue && newValue != '')
   return "Lykilorð passa ekki saman"
}

export function validateEmail(value) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && value.length > 0 && !re.test(value)) return 'Netfang ógilt';
}

export function validateDescription(value) {
  if (value && value.length > 10) return '';
  else if (value && value.length > 0) return 'Verður að vera 10 stafir eða meira';
}

export function validateDateInput(value) {
  if (value && value.substring(0,10) < new Date().toISOString().substring(0,10))
    return 'Ógild dagsetning'
}

export function getEmailValidationState(value) {
  if (value && validateEmail(value) == 'Netfang ógilt') return 'error';
}

export function getValidationState(value) {
if (value && value.length > 4) return '';
  else if (value && value.length > 0) return 'error';
}

export function getPasswordValidationState(newValue, value) {
 if (value != newValue && newValue != '')
   return "error"
}

export function returnFormErrors(data) {
  const errors = {};
    if (data && data.name.length < 3 || data.descriptionIce.length < 10 || validateDateInput(data.time.toISOString()) != null) {
      errors.value = 'Error in form!'
    } else {
      errors.value = null;
    }
  return errors;
}


export function returnPerformerFormErrors(data) {
  const errors = {};
    if (data && data.performerId <= 0 || data.descriptionIce.length < 10 || data.descriptionEng.length < 10) {
      errors.value = 'Error in form!'
    } else {
      errors.value = null;
    }
  return errors;
}

export function returnLocationFormErrors(data) {
  const errors = {};
  var re = /^[A-Za-zÁÉÍÓÚÆÐáéíóúæð]+\s\d+/;
  if (data && data.locationId == null || data.locationId <= 0 || data.address < 4 || !re.test(data.address)) {
    errors.value = 'Errors in form!'
  } else {
    errors.value = null;
  }
  return errors;
}

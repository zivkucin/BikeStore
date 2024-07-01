function validatePassword(password) {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 20;
    const SPECIAL_CHARS = /[*@!#%&()^~{}]+/;
    const NUMBERS = /[0-9]/;
    const LOWER_CASE_CHARS = /[a-z]/;
    const UPPER_CASE_CHARS = /[A-Z]/;
    
    if (!password) {
      return "Ovo polje je obavezno";
    }
    
    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
      return "Lozinka mora da sadrži između 8 i 20 karaktera";
    }
    
    if (!SPECIAL_CHARS.test(password)) {
      return "Lozinka mora da sadrži barem jedan specijalni karakter [*@!#%&()^~{}]+";
    }
    
    if (!NUMBERS.test(password)) {
      return "Lozinka mora da sadrži barem jedan broj";
    }
    
    if (!LOWER_CASE_CHARS.test(password)) {
      return "Lozinka mora da sadrži barem jedno malo slovo";
    }
    
    if (!UPPER_CASE_CHARS.test(password)) {
      return "Lozinka mora da sadrži barem jedno veliko slovo";
    }
    
    return true;
  }
  
  function validatePhoneNumber(phoneNumber) {
    const NUMBERS = /^[0-9]*$/;
    if (phoneNumber && !NUMBERS.test(phoneNumber)) {
      return "Ovo polje može da sadrži samo numeričke karaktere";
    }
    return true;
  }

export {validatePassword, validatePhoneNumber}
var mcache = require('memory-cache');


const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
var generatePassword  = function(length)  {
    let password = '';
    for(var i=0; i < length; i++ ) {  
        let  newChar = char_list.charAt(Math.floor(Math.random() * char_list.length));
        password.includes(newChar) ? i-- : password+= newChar; 
    }
    mcache.put('password', password);
    return password;
};

var getPassword = function() {
    let password = mcache.get('password')
    if (!(password)) {
         password = generatePassword(8);
    }
    return password; 
};

var shufflePassword  = function() {
    let password = generatePassword(8);
    var a = password.split(""),
          n = a.length;
  
      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
    let hint = a.join("").toString();
    return hint;
};

var verifyPassword = function(answer) {
    let password = mcache.get('password');
    return !(password) ? false : answer === password ? true : false;
};

var highlight = function(answer) {
    
    let password = getPassword();
    let arrAnswers = answer.split("");
    let highlight = arrAnswers.filter(function(index){
        return password.includes(index);
    });
    
    return highlight;
};


module.exports = {  getPassword: getPassword, 
                    shufflePassword: shufflePassword, 
                    generatePassword:generatePassword, 
                    verifyPassword: verifyPassword,
                    highlight: highlight } ;
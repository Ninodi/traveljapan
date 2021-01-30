var users = new Database('users');

function register(){
    if(!checkPasswords()) return;

    var user = {
        username: getUsername(),
        password: getPassword()
    }

    for(let usr of users.getAll()){
        if(usr.username == user.username) return;
    }

    users.create(user);
}

function checkPasswords(){
    var pass = getPassword();
    var repeatPass = getRepeatPassword();

    if(pass !== repeatPass || pass.length < 8) return false;

    let containsUppercase = false;
    let containsNumber = false;

    let i=0;
    while(i <= pass.length){
        character = pass.charAt(i);
        if(!isNaN(character*1)) containsNumber = true;
        else if(character == character.toUpperCase()) containsUppercase = true;
        i++;
    }
    if(!containsUppercase || !containsNumber) return false;

    return true;
}

function getUsername(){
    return document.getElementById('username').value;
}

function getPassword(){
    return document.getElementById('password').value;
}

function getRepeatPassword(){
    return document.getElementById('repeat_password').value;
}
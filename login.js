function getValue(query) {
	return document.querySelector(query).value
}

var users = new Database('users')

function login() {
	var user = users.get('username', getValue('input#username'))

	if(!user){
		document.getElementById('error_message').innerText = 'მომხმარებელი არ არსებობს'
		return;
	}

	if (user.password === getValue('input#password')) {
		localStorage.setItem('status', 'loggedin')
		window.location = "./index.html"			
	} else {
		document.getElementById('error_message').innerText = 'პაროლი არასწორია';
	}
}
(function() {
      "use strict";
	const xhr = new XMLHttpRequest();
	const header = document.querySelector('header');
	xhr.open('GET', 'header.html');
	xhr.onload = ()=> {
		// document.header.innerHTML = xhr.response;
		header.innerHTML = xhr.response;
	}
	xhr.send();

})();


(function() {
      "use strict";
	const xhr = new XMLHttpRequest();
	const footer = document.querySelector('footer');
	xhr.open('GET', 'footer.html');
	xhr.onload = ()=> {
		// document.body.innerHTML = xhr.response;
		footer.innerHTML = xhr.response;
	}
	xhr.send();

})();


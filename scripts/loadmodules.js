(function() {
      "use strict";
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'header.html');
	xhr.onload = ()=> {
		document.body.innerHTML = xhr.response
	}
	xhr.send();
})();
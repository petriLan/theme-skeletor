document.querySelectorAll('.sub-menu-toggle').forEach(function(menuElement) {
	menuElement.addEventListener('click', function() {
		this.closest('.menu-item-has-children').classList.toggle('open');
	});
});

document.querySelectorAll('.sub-menu-title').forEach(function(menuElement) {
	menuElement.childNodes[0].addEventListener('click', function(event) {
		event.preventDefault();
	});
});

document.querySelector('.hamburger_wrapper').addEventListener('click', function(event) {
	document.querySelector('#navigation').classList.toggle('open');
});

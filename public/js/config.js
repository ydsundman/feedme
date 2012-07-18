var yds = yds || {};

$.holdReady(true);

$.when(
	$.get('../templates/slTmpl.html'),
	$.get('../templates/slItemTmpl.html'),
	$.get('../templates/slInstanceTmpl.html'),
	$.get('../templates/slInstanceItemTmpl.html')).done(

	function (slTmpl, slItemTmpl, slInstanceTmpl, slInstanceItemTmpl) {
		$.templates({
			slTmpl:slTmpl[0],
			slItemTmpl:slItemTmpl[0],
			slInstanceTmpl:slInstanceTmpl[0],
			slInstanceItemTmpl:slInstanceItemTmpl[0]
		});
		$.holdReady(false);
		console.log('Templates loaded! tmpl: ' + $.render.slTmpl);
	}).fail(function(result) {
		$.holdReady(false);
		console.log('Template load failed, result: ' + result);
	});

yds.config = {
	listContainerSelector: '#main',
	listRowParentSelector: '#main tbody',
	listRowSelector: 'tr',
	addListClickSelector: '.actionAddList',
	listNameInputSelector: '#main input[type="text"]',

	listInstanceContainerSelector: '#main2',
	listItemRowParentSelector: '#main2 tbody',
	listItemRowSelector: '#main2 td',
	addListItemClickSelector: '.actionAddItem',
	listItemNameInputSelector: '#main2 input[type="text"]'
};
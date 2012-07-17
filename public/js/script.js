$(function() {
	yds.loadAndRenderLists();
	$('#main').on('click', '.actionAddList', yds.handleAddListClick);
	$('#main').on('click', 'li', yds.handleListClick);
	$('#main2').on('click', '.actionAddItem', yds.handleAddListItemClick);
});

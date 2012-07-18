$(function() {
	var cfg = yds.config;
	yds.loadAndRenderLists();
	$(cfg.listContainerSelector).on('click', cfg.addListClickSelector, yds.handleAddListClick);
	$(cfg.listContainerSelector).on('click', cfg.listRowSelector, yds.handleListClick);
	$(cfg.listInstanceContainerSelector).on('click', cfg.addListItemClickSelector, yds.handleAddListItemClick);
});

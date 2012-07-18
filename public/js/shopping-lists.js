var yds = yds || {};

yds.jq = $;

// Event handlers
yds.handleListClick = function(event) {
	var li = $(event.target), id = li.attr('id');
	event.preventDefault();
	event.stopPropagation();
	yds.loadList(id);
};

yds.handleAddListItemClick = function(event) {
	var itemName = $(yds.config.listItemNameInputSelector).val();
	event.preventDefault();
	event.stopPropagation();
	if (itemName) {
		yds.addItem(itemName);
	}
	$(yds.config.listItemNameInputSelector).val('');
};

yds.addList = function (name) {
	yds.jq.post('lists', {name:name}, function (data) {
		$(yds.config.listNameInputSelector).val('');

		var listMarkup = $('#slItemTmpl').render({_id: data._id, name: data.name});
		$(listMarkup).appendTo(yds.config.listRowParentSelector);
	});
};

yds.addItem = function(item) {
	var itemMarkup = $('#slInstanceItemTmpl').render({name: item});
	$(itemMarkup).appendTo(yds.config.listItemRowParentSelector);
	yds.saveShoppingList();
};

yds.handleAddListClick = function(event) {
	var name = $(yds.config.listNameInputSelector).val();
	event.preventDefault();
	event.stopPropagation();
	if (name) {
		yds.addList(name);
	}
};

yds.loadList = function (id) {
	yds.loadShoppingList("lists/" + id, function (sl) {
		var container = $(yds.config.listInstanceContainerSelector);
		container.html($('#slInstanceTmpl').render(sl));
		container.attr('list-id', id);
	});
};

yds.saveShoppingList = function() {
	var id = $(yds.config.listInstanceContainerSelector).attr('list-id'),
		name = $('#' + id).text(),
		items = [];
	$(yds.config.listItemRowSelector).each(function() {
		items.push({name: $(this).text()});
	});
	yds.jq.ajax({headers: {'Content-type': 'application/json'}, url: 'lists/' + id, type:'PUT', data:JSON.stringify({_id:id, name:name, items: items})});
};

yds.loadShoppingList = function (url, cb) {
	yds.jq.getJSON(url, function (data) {
		cb(data);
	});
};

yds.loadAndRenderLists = function() {
	yds.jq.getJSON("lists", function (data) {
		var html = $('#slTmpl').render({sls:data});
		$('#main').html(html);
	});
};

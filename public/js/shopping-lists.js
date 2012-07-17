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
	var itemName = $('#main2 input[type="text"]').val();
	event.preventDefault();
	event.stopPropagation();
	if (itemName) {
		yds.addItem(itemName);
	}
	$('#main2 input[type="text"]').val('');
};

yds.addList = function (name) {
	yds.jq.post('lists', {name:name}, function (data) {
		$('#main input[type="text"]').val('');

		var listMarkup = $('#slItemTmpl').render({_id: data._id, name: data.name});
		$(listMarkup).appendTo('#main ul');
	});
};

yds.addItem = function(item) {
	var itemMarkup = $('#slInstanceItemTmpl').render({name: item});
	$(itemMarkup).appendTo('#main2 ul');
	yds.saveShoppingList();
};

yds.handleAddListClick = function(event) {
	var name = $('#main input[type="text"]').val();
	event.preventDefault();
	event.stopPropagation();
	if (name) {
		yds.addList(name);
	}
};

yds.loadList = function (id) {
	yds.loadShoppingList("lists/" + id, function (sl) {
		$('#main2').html($('#slInstanceTmpl').render(sl));
	});
};

yds.saveShoppingList = function() {
	var id = $('#selected-shopping-list').attr('shopping-list-id'),
		name = $('#' + id).text(),
		items = [];
	$('#shopping-list-items li').each(function(index, item) {
		items.push({name: $(item).text()});
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

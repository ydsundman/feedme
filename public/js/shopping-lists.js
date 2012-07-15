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

yds._buildListItem = function (id, name) {
	return $('<li/>', {
		id:id,
		html:name
	});
};

yds.getShoppingLists = function () {

	var renderShoppingList = function (targetLi) {
		var id = $(targetLi).attr('id');
		yds.loadShoppingList("lists/" + id, function(sl) {
			yds.renderShoppingList2(sl);
			$('#selected-shopping-list .actionAddItem').click(function (e) {
				alert(e);
			});
		});
	};

	var processListItems = function (data) {
		$.each(data, function (key, val) {
			yds._buildListItem(val._id, val.name).appendTo('#shopping-lists');
		});
	};

	yds._renderList('#main', 'shopping-lists', 'lists', renderShoppingList, processListItems);
};

yds.addItem = function(item) {
	var itemMarkup = $('#slItemTmpl').render({name: item});
	$(itemMarkup).appendTo('#main2 ul');
	yds.saveShoppingList();
};

yds.loadList = function (id) {
	yds.loadShoppingList("lists/" + id, function (sl) {
		yds.renderShoppingList2(sl);
		$('#selected-shopping-list .actionAddItem').click(yds.handleAddListItemClick);
	});
};

yds._renderList = function (parentElementSelector, listId, url, onClickFunction, processListItems) {
	yds.jq.getJSON(url, function (data) {

		$('<ul/>', {
			id:listId
		}).click(yds.handleListClick).appendTo(parentElementSelector);

		processListItems(data);
	});
};

yds.renderAddList = function () {
	var fn = function () {
		var name = $('#main input[type="text"]').val();
		yds.jq.post('lists', {name:name}, function (data) {
			$('#main input[type="text"]').val('');
			yds._buildListItem(data._id, data.name).appendTo('#shopping-lists');
		});
	};
	yds._renderInputArea('#main', fn);
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

yds._renderInputArea = function (parentElementSelector, fn) {
	$('<input/>', {
		type:'text',
		name:'list-name'
	}).appendTo(parentElementSelector);
	$('<input/>', {
		type:'button',
		value:'Add'
	}).click(fn).appendTo(parentElementSelector);
};

yds.loadShoppingList = function (url, cb) {
	yds.jq.getJSON(url, function (data) {
		cb(data);
	});
};

yds.renderShoppingList2 = function(sl) {
	$('#main2').html($('#slTmpl').render(sl));
};

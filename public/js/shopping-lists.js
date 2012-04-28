var yds = yds || {};

yds.jq = $;

yds._buildListItem = function (id, name) {
	return $('<li/>', {
		id:id,
		html:name
	});
};

yds.getShoppingLists = function () {

	var renderShoppingList = function (targetLi) {
		var div = $('#selected-shopping-list'), li = $(targetLi), id = li.attr('id');
		if (div && div.attr('shopping-list-id') !== id) {
			div.remove();
			$('<div/>', {
				id:'selected-shopping-list',
				'shopping-list-id':id
			}).html(li.html()).appendTo("#main");
			yds.renderAddItem();
			yds.renderShoppingListItems(id);
		}
	};

	var processListItems = function (data) {
		$.each(data, function (key, val) {
			yds._buildListItem(val._id, val.name).appendTo('#shopping-lists');
		});
	};

	yds._renderList('#main', 'shopping-lists', 'lists', renderShoppingList, processListItems);
};

yds.renderShoppingListItems = function (shoppingListId) {
	var processListItems = function (data) {
		$.each(data.items, function (key, item) {
			$('<li/>', {
				html:item.name
			}).appendTo('#shopping-list-items');
		});
	};
	yds._renderList("#selected-shopping-list", "shopping-list-items", 'lists/' + shoppingListId, function () {
	}, processListItems);
};

yds._renderList = function (parentElementSelector, listId, url, onClickFunction, processListItems) {
	yds.jq.getJSON(url, function (data) {

		$('<ul/>', {
			id:listId
		}).click(
			function (e) {
				if ($(e.target).is('li')) {
					onClickFunction(e.target);
				}
			}).appendTo(parentElementSelector);

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

yds.renderAddItem = function(f) {
	var fn = f || function () {
		var name = $('#selected-shopping-list input[type="text"]').val();
		$('#selected-shopping-list input[type="text"]').val('');
		$('<li/>', {
			html:name
		}).appendTo('#shopping-list-items');
	};

	yds._renderInputArea('#selected-shopping-list', fn);
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

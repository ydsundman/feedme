var yds = yds || {};

yds.jq = $;

yds._buildListItem = function(id, name) {
	return $('<li/>', {
		id: id,
		html: name
	});
};

yds.getShoppingLists = function() {
	yds.jq.getJSON('lists', function(data) {

		$('<ul/>', {
			id: 'shopping-lists'
		}).appendTo('#main');

		$.each(data, function(key, val) {
			yds._buildListItem(val._id, val.name).appendTo('#shopping-lists');
		});
	});
};

yds.renderAddList = function() {
	var fn = function() {
		var name = $('#main input[type="text"]').val();
		yds.jq.post('lists', {name:name}, function(data){
			$('#main input[type="text"]').val('');
			yds._buildListItem(data._id, data.name).appendTo('#shopping-lists');
		});
	};

	$('<input/>', {
		type: 'text',
		name: 'list-name'
	}).appendTo('#main');
	$('<input/>', {
		type: 'button',
		value: 'Add'
	}).click(fn).appendTo('#main');

};


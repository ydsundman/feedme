var yds = yds || {};

yds.jq = $;

yds._buildListItem = function(id, name) {
	return $('<li/>', {
		id: id,
		'class': 'ui-state-default'
	}).append('<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + name);
};

yds.getShoppingLists = function() {
	yds.jq.getJSON('lists', function(data) {

		$('<ul/>', {
			id: 'shopping-lists',
			'class': 'sortable'
		}).appendTo('#main');

		$.each(data, function(key, val) {
			yds._buildListItem(val._id, val.name).appendTo('#shopping-lists');
		});
		$(function () {
			yds.jq('.sortable').sortable();
			yds.jq('.sortable').disableSelection();
		});
	});
};

yds.renderAddList = function() {
	var fn = function() {
		var name = $('#main input[type="text"]').val();
		yds.jq.post('lists', {name:name}, function(data){
			$('#main input[type="text"]').val('');
			yds._buildListItem(data._id, data.name).appendTo('#shopping-lists');
			$(function () {
				yds.jq('.sortable').sortable();
				yds.jq('.sortable').disableSelection();
			});
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


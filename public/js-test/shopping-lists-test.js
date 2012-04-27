ShoppingListTest = TestCase("ShoppingListTest");

ShoppingListTest.prototype.setUp = function () {
	/*:DOC += <div id="main"></div> */
	yds.jq = function () {
		return {sortable:function () {}, disableSelection: function() {}};
	};
};

ShoppingListTest.prototype.testGetShoppingList = function () {
	var getJSON = function (url, fn) {
		fn([
			{_id:'1', name:'one' },
			{_id:'2', name:'two' }
		]);
	};
	yds.jq.getJSON = getJSON;

	yds.getShoppingLists();
	assertEquals(1, $('#shopping-lists').length);
	assertEquals('1', $('#shopping-lists li:first').attr('id'));
	assertEquals('one', $('#shopping-lists li:first').text());
	assertEquals('2', $('#shopping-lists li:last').attr('id'));
	assertEquals('two', $('#shopping-lists li:last').text());

	assertTrue($('#shopping-lists').hasClass('sortable'));
	assertTrue($('#shopping-lists li:first').hasClass('ui-state-default'));

};

ShoppingListTest.prototype.test_buildListItem = function () {
	assertEquals('function', typeof yds._buildListItem);
	assertEquals(2, yds._buildListItem.length);
	var li = yds._buildListItem('1234', 'xxx');
	assertEquals('1234', $(li).attr('id'));
	assertEquals('xxx', $(li).text());
	assertTrue($(li).hasClass('ui-state-default'));
	assertEquals('<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>xxx', $(li).html());
	assertTrue($(li).children('span:first').hasClass('ui-icon'));
	assertTrue($(li).children('span:first').hasClass('ui-icon-arrowthick-2-n-s'));
};

ShoppingListTest.prototype.testRenderAddListButton = function () {
	var clicked = false, callback = function() {
		clicked = true;
	};

	yds.renderAddList(callback);

	assertEquals(1, $('#main input[type="button"]').length);
	assertEquals('Add', $('#main input[type="button"]').attr('value'));
	assertEquals(1, $('#main input[type="text"]').length);
	assertEquals('list-name', $('#main input[type="text"]').attr('name'));
};

ShoppingListTest.prototype.testAddAList = function () {
	/*:DOC main += <ul id="shopping-lists"><li id="1">one</li></ul> */

	yds.renderAddList();

	$('#main input[type="text"]').val('newlistname');

	var urlPassed, dataPassed, post = function (url, data, success) {
		urlPassed = url;
		dataPassed = data;
		success({_id:'1234', name:'newlistname' });
	};
	yds.jq.post = post;

	$('#main input[type="button"]').click();

	assertEquals('lists', urlPassed);
	assertEquals({name:'newlistname'}, dataPassed);
	assertEquals('', $('#main input[type="text"]').val());
	assertEquals(2, $('#shopping-lists li').length);
	assertEquals('1234', $('#shopping-lists li:last').attr('id'));
	assertEquals('newlistname', $('#shopping-lists li:last').text());
};

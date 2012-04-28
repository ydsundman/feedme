ShoppingListTest = TestCase("ShoppingListTest");

ShoppingListTest.prototype.setUp = function () {
	/*:DOC += <div id="main"></div> */

	ShoppingListTest.getJSON = function (url, fn) {
		fn([
			{_id:'1', name:'one' },
			{_id:'2', name:'two' }
		]);
	};
};

ShoppingListTest.prototype.testGetShoppingList = function () {

	yds.jq.getJSON = ShoppingListTest.getJSON;

	yds.getShoppingLists();
	assertEquals(1, $('#shopping-lists').length);
	assertEquals('1', $('#shopping-lists li:first').attr('id'));
	assertEquals('one', $('#shopping-lists li:first').text());
	assertEquals('2', $('#shopping-lists li:last').attr('id'));
	assertEquals('two', $('#shopping-lists li:last').text());
};

ShoppingListTest.prototype.test_buildListItem = function () {
	assertEquals('function', typeof yds._buildListItem);
	assertEquals(2, yds._buildListItem.length);
	var li = yds._buildListItem('1234', 'xxx');
	assertEquals('1234', $(li).attr('id'));
	assertEquals('xxx', $(li).text());
	assertEquals('xxx', $(li).html());
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

	var urlPassed, dataPassed;
	yds.jq.post = function (url, data, success) {
		urlPassed = url;
		dataPassed = data;
		success({_id:'1234', name:'newlistname' });
	};

	$('#main input[type="button"]').click();

	assertEquals('lists', urlPassed);
	assertEquals({name:'newlistname'}, dataPassed);
	assertEquals('', $('#main input[type="text"]').val());
	assertEquals(2, $('#shopping-lists li').length);
	assertEquals('1234', $('#shopping-lists li:last').attr('id'));
	assertEquals('newlistname', $('#shopping-lists li:last').text());
};

ShoppingListTest.prototype.testNoItemListDivShouldBeCreatedForClickOnUl = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();
	$('#shopping-lists').click();
	assertEquals(0, $('#selected-shopping-list').length);
};

ShoppingListTest.prototype.testAnItemListDivShouldBeCreatedOnAnLiClick = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();
	$('#shopping-lists li:first').click();
	assertEquals(1, $('#main #selected-shopping-list').attr('shopping-list-id'));
};

ShoppingListTest.prototype.testClickingOnAnotherLiShouldOnlyChangeTheListItemDiv = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();
	$('#shopping-lists li:first').click();
	assertEquals(1, $('#main #selected-shopping-list').attr('shopping-list-id'));
	$('#shopping-lists li:last').click();
	assertEquals(1, $('#main #selected-shopping-list').length);
	assertEquals(2, $('#main #selected-shopping-list').attr('shopping-list-id'));
};

ShoppingListTest.prototype.testClickingOnTheLiAlreadySelectedShouldDoNothing = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();

	$('#shopping-lists li:first').click();
	assertEquals(1, $('#main #selected-shopping-list').attr('shopping-list-id'));

	assertEquals('', $('#selected-shopping-list').html());
	$('#selected-shopping-list').html('XXX');

	$('#shopping-lists li:first').click();
	assertEquals('XXX', $('#selected-shopping-list').html());
};
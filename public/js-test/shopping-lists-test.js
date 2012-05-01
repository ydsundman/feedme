ShoppingListTest = TestCase("ShoppingListTest");

ShoppingListTest.prototype.setUp = function () {
	/*:DOC += <div id="main"></div> */

	ShoppingListTest.getJSON = function (url, fn) {
		var result;
		if (url === 'lists') {
			result = [
				{_id:'1', name:'one' },
				{_id:'2', name:'two' }
			];
		} else {
			result =
			{_id:'1', name:"one", items:[
				{name:"milk"},
				{name:"bread"}
			]};
		}
		fn(result);
	};
	ShoppingListTest.saveShoppingList = yds.saveShoppingList;
};

ShoppingListTest.prototype.tearDown = function () {
	yds.saveShoppingList = ShoppingListTest.saveShoppingList;
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

ShoppingListTest.prototype.testGetShoppingListItems = function () {

	yds.jq.getJSON = ShoppingListTest.getJSON;
	$('<div/>', {
		id:'selected-shopping-list'
	}).appendTo('#main');

	yds.renderShoppingListItems('1');
	assertEquals(1, $('#shopping-list-items').length);
	assertEquals('milk', $('#shopping-list-items li:first').text());
	assertEquals('bread', $('#shopping-list-items li:last').text());
};

ShoppingListTest.prototype.test_buildListItem = function () {
	assertFunction(yds._buildListItem);
	assertEquals(2, yds._buildListItem.length);
	var li = yds._buildListItem('1234', 'xxx');
	assertEquals('1234', $(li).attr('id'));
	assertEquals('xxx', $(li).text());
	assertEquals('xxx', $(li).html());
};

ShoppingListTest.prototype.testRenderAddListButton = function () {
	var clicked = false, callback = function () {
		clicked = true;
	};

	yds.renderAddList(callback);

	assertEquals(1, $('#main input[type="button"]').length);
	assertEquals('Add', $('#main input[type="button"]').attr('value'));
	assertEquals(1, $('#main input[type="text"]').length);
	assertEquals('list-name', $('#main input[type="text"]').attr('name'));
};

ShoppingListTest.prototype.testRenderAddItemButton = function () {
	var clicked = false, callback = function () {
		clicked = true;
	};

	$('<div/>', {
		id:'selected-shopping-list'
	}).appendTo('#main');

	yds.renderAddItem(callback);

	assertEquals(1, $('#selected-shopping-list input[type="button"]').length);
	assertEquals('Add', $('#selected-shopping-list input[type="button"]').attr('value'));
	assertEquals(1, $('#selected-shopping-list input[type="text"]').length);
	assertEquals('list-name', $('#selected-shopping-list input[type="text"]').attr('name'));

	$('#selected-shopping-list input[type="button"]').click();
	assertTrue(clicked);

};

ShoppingListTest.prototype.testAddAListItem = function () {
	var saveShoppingListCalled = false;
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();
	$('#shopping-lists li:first').click();

	yds.saveShoppingList = function() {
		saveShoppingListCalled = true;
	};

	$('#selected-shopping-list input[type="text"]').val('new item');
	$('#selected-shopping-list input[type="button"]').click();
	assertEquals('', $('#selected-shopping-list input[type="text"]').val());
	assertEquals(3, $('#shopping-list-items li').length);
	assertEquals('new item', $('#shopping-list-items li:last').text());
	assertTrue(saveShoppingListCalled);
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
	assertEquals('one', $('#selected-shopping-list').html().substring(0, 3));
	$('#shopping-lists li:last').click();
	assertEquals(1, $('#main #selected-shopping-list').length);
	assertEquals(2, $('#main #selected-shopping-list').attr('shopping-list-id'));
	assertEquals('two', $('#selected-shopping-list').html().substring(0, 3));
};

ShoppingListTest.prototype.testClickingOnTheLiAlreadySelectedShouldDoNothing = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.getShoppingLists();

	$('#shopping-lists li:first').click();
	assertEquals(1, $('#main #selected-shopping-list').attr('shopping-list-id'));
	assertEquals('one', $('#selected-shopping-list').html().substring(0, 3));

	$('#shopping-lists li:first').click();
	assertEquals('one', $('#selected-shopping-list').html().substring(0, 3));
};

ShoppingListTest.prototype.testSaveShoppingListShouldCollectItemsFromMarkupAndPost = function () {
	/*:DOC
		main += <ul id="shopping-lists">
					<li id="1">one</li>
				</ul>
				<div id="selected-shopping-list" shopping-list-id="1">
					<ul id="shopping-list-items">
						<li>xxx</li>
	                    <li>yyy</li>
	                <ul>
				</div>
	*/

	var optionsPassed;
	yds.jq.ajax = function(options) {
		optionsPassed = options;
	};
	yds.saveShoppingList();

	assertEquals({'Content-type':'application/json'}, optionsPassed.headers);
	assertEquals('lists/1', optionsPassed.url);
	assertEquals('PUT', optionsPassed.type);
	assertEquals(JSON.stringify({_id:'1', name:'one', items:[{name:'xxx'}, {name:'yyy'}]}), optionsPassed.data);
};


ShoppingListTest = TestCase("ShoppingListTest");

ShoppingListTest.prototype.setUp = function () {
	/*:DOC += 	<div id="main"></div>
	            <div id="main2"></div>
	            <script id="slTmpl" type="text/x-jsrender">
					<div id="selected-shopping-list" shopping-list-id="{{:_id}}">
						{{:name}}
						<input type="text" name="item-name">
	                    <input type="button" value="Add" class="actionAddItem">
	                    <ul id="shopping-list-items">
		                    {{for items}}
								<li>{{:name}}</li>
	                        {{/for}}
						</ul>
	                </div>
				</script>
	 */

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

ShoppingListTest.prototype.oldtestSaveShoppingListShouldCollectItemsFromMarkupAndPost = function () {
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

ShoppingListTest.prototype.testLoadShoppingList = function () {
	yds.jq.getJSON = ShoppingListTest.getJSON;
	yds.loadShoppingList("list/123", function(sl) {
		assertEquals(1, sl._id);
	});
};

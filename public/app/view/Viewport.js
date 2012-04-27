(function() {
	var editor = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	});

	Ext.define('FeedMe.view.Viewport', {
		extend: 'Ext.grid.Panel',

		alias: 'widget.lists',

		selType: 'cellmodel',
		editor: editor,

		store: 'Lists',
		renderTo: 'lists',
		width: 400,
		height: 300,
		frame: true,
		title: 'Feed Me',
		tbar: [
			{
				text: 'Add List',
				handler : function() {
					// Create a record instance through the ModelManager
					var r = Ext.ModelManager.create({
						name: 'New List'
					}, 'FeedMe.model.List');
					Ext.getStore('Lists').insert(0, r);
					editor.startEditByPosition({row: 0, column: 0});
				}
			}
		],

		initComponent: function () {
			this.columns = [
				{
					header: 'Shopping Lists',
					sortable: false,
					dataIndex: 'name',
					editor: {
						xtype: 'textfield',
						allowBlank: true
					},
					flex: 1
				}
			];
			this.plugins = [this.editor];
			this.callParent(arguments);
		}
	});
})();
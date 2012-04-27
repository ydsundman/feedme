Ext.define('FeedMe.model.List', {
	extend: 'Ext.data.Model',
	idProperty: '_id',
	fields: [
		{
			name: '_id',
			type: 'string'
		},
		{
			name: 'name',
			type: 'string'
		}
	]
});

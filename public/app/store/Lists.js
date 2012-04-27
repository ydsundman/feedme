Ext.define('FeedMe.store.Lists', {
	extend: 'Ext.data.Store',

	autoLoad: true,
	autoSync: true,
	fields: ['_id', 'name'],

	proxy: {
		type: 'rest',
		url: '/lists',
		model: 'FeedMe.model.List',
		reader: {
			type: 'json'

		}
	}
});

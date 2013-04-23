define([
	'jquery',
	'backbone',
	'm/FormModel',
	'm/PlainConfig',
	'v/FormView',
	'./data',
	'v/PropertyFormView',
	'v/LayoutView',
	'text!tmpl/news_config.txt'
], function($, Backbone, FormModel, PlainConfig, FormView, config,
		PropertyFormView, LayoutView, plainConfig) {

	$(function() {
		var newsConfig = PlainConfig.convert(plainConfig);
		var formConfig = {
			id: 'news-form-index',
			defaults: {
				layout: 'fit',
				labelWidth: 80 //px
			},
			rows: newsConfig 
		};

		var model = new FormModel(formConfig);
		var view = new FormView({model:model});
		var el = view.render().el;

		console.log(model.toJSON());

		var propForm = new PropertyFormView();
		propForm.render();

		$('#formcanvas').append(el);

		$('#btnAddRow').click(function(e) {
			model.addRow();
		});

		$('#btnRemoveRow').click(function(e) {
			console.log('remove last row');	
			model.removeLastRow();
		});

		var appLayout = new LayoutView();
		appLayout.render();

		var Workspace = Backbone.Router.extend({
			routes: {
				'cell/:row/:column': 'editCell'
			},
			editCell: function(row, column) {
				var currentRow = model.getRows().at(row);
				if(currentRow == undefined) {
					return;
				}

				var currentColumn = currentRow.getColumns().at(column);
				if(currentColumn == undefined) {
					return;
				}

				if(currentColumn.get('selected') == false) {
					currentColumn.set({
						selected: true
					});
				}

				var fieldModel = currentColumn.getContent();	

				propForm.loadData(fieldModel);
			}
		});
		
		router = new Workspace;
		Backbone.history.start();
	});
});



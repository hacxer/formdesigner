var FieldView = Backbone.View.extend(
	tagName: 'div',
	className: 'cell',
	template: _.template( $('#tmpl-text').html() ),

	events: {
		'change input': "onChanged"	
	},
	/*
	 * name changed, 需要改变input&label的id
	 * 改变input中的name
	 * */
	initialize: function() {
		this.model.bind('change:name', this.nameUpdated, this);		
		this.model.bind('change:value', this.valueUpdated, this);
	},
	render: function() {
		var json = this.model.toJSON();
		var html = this.template(json);
	
		this.$el.html(html);
		this.cellBody =  this.$el;
		this.label = this.$('label');
		this.inputTag =  this.$('input');

		return this;
	},
	nameUpdated: function() {
		var id = this.model.get('id');
		var name = this.model.getName();
		this.label.attr(id);

		this.inputTag.attr('id', id)
			.attr('name', name);
	},
	valueUpdated:	function() {
		var value = this.model.getValue();
		this.inputTag.val(value);
	},
	onChanged: function(e) {
		var val = this.inputTag.val();	

		this.model.set({
				value: val
			}, {
				silent: true
			});
	}
});

Template.lists.helpers({
	lists: function() {
	    return Lists.find();
	},
	tasks: function() {
		return Tasks.find();
	},
	checkedClass: function() {
	  return this.checked && 'checked';
	}
});

Template.lists.events({

	'change [type=checkbox]': function(event) {
	  var checked = $(event.target).is(':checked');
	  Meteor.call("updateTask",[this._id, checked]);
	},

	'keydown .update_task': function(event) {
		if (13 === event.which) {
			event.preventDefault();
			$input = $('.update_task').val();
			Meteor.call("addToList",[$input, this.code],function(error , content){
    		});
		}
    }
});
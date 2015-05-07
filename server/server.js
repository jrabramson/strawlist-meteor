Meteor.methods({
  addList : function(list){
    var newCode = String(Math.floor(Math.random() * 900000) + 100000);
    var newList = Lists.insert({
      'code'        : newCode,
      'title'       : list['title'],
      'submittedOn' : new Date()
    });
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    var taskNumber = Object.size(list)-1; 
    for(i=0;i<taskNumber;i++){
    	theTask = 'task'+i;
    	if(list[theTask]!==""){
	    	Tasks.insert({
	    	  'content'     : list[theTask],
	    	  'listCode'    : newCode,
	    	  'checked'     : false,
	    	  'submittedOn' : new Date()
	    	});
    	}
    }
    return newCode;
  },
  addToList: function(content){
  	var taskContent = Tasks.insert({
  	  'listCode'    : content[1],
  	  'content'     : content[0],
  	  'checked'     : false,
  	  'submittedOn' : new Date()
  	});
  	return content;
  },
  updateTask: function(task){
  	Tasks.update(task[0], {$set: {checked: task[1]}});
  }
});

Meteor.publish('lists', function(listCode) {
  check(listCode, String);
  return Lists.find({code: listCode});
});

Meteor.publish('tasks', function(listCode) {
  check(listCode, String);
  return Tasks.find({listCode: listCode});
});
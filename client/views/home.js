Template.home.helpers({

});

taskCount = 5;

Template.home.events({
  'keydown input[type=text]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown .new_task:last-of-type': function(event) {
    $('.task_list').append('<input type="text" class="new_task" name="task'+taskCount+'" placeholder="To do...">');
    taskCount++;
  },
  
  'click .create': function(event) {
    event.preventDefault();

    var $input = {};
    $.each($('.new-list').serializeArray(), function(_, t) {
      $input[t.name] = t.value;
    });
    console.log($input);
    if ($input.length===0)
      return;
    
    Meteor.call("addList",$input,function(error , listCode){
          $('input[type=text]').val("");
          $('.created_link').attr('href','/' + listCode);
          $('.created_link').html('http://www.strawlist.me/' + listCode);
          $('#created_alert').show();
        });
    }
});
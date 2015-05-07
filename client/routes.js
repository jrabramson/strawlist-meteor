Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  // Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {

  this.route('home', {
    path: '/'
    // action: function() {
    //   Router.go('listsShow', Lists.findOne());
    // }
  });
  this.route('lists', {
    path: '/:code',
    // subscribe to lists before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.listsHandle = Meteor.subscribe('lists', this.params.code);
      this.listTasks = Meteor.subscribe('tasks', this.params.code);
      this.next();
    },
    data: function () {
      return Lists.findOne({ code: this.params.code});
    },
    action: function () {
      this.render();
    }
  });

});

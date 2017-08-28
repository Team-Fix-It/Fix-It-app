myApp.controller('NavController', function(){
  console.log('NavController loaded.');
  var vm = this;

  vm.goto = function(path) {
    console.log(path);
  };
});

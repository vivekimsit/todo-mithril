'use strict';

var todo = {};

/* Models */
todo.Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(false);
};

todo.TodoList = Array;

/* View model */
todo.vm = (function(){
  var vm = {};
  vm.init = function() {
    vm.list = new todo.TodoList();

    vm.description = m.prop('');

    vm.add = function() {
      if (vm.description()) {
        vm.list.push(new todo.Todo({description: vm.description()}));
        vm.description('');
      }
    };

    vm.remove = function() {
      vm.list = vm.list.filter(function(task) {
        return !task.done();
      });
    }
  }
  return vm;
}());

/* Controllers */
todo.controller = function() {
  todo.vm.init();
}

/* View */
todo.view = function() {
  var taskList = todo.vm.list.map(function(task, index) {
    return m('li.todo-item', [
      m('input[type=checkbox]', {
        onclick: m.withAttr('checked', task.done),
        checked: task.done()
      }),
      m('label', {
        style: task.done() ? 'text-decoration: line-through' : 'none'
      }, task.description())]);
  });
  var newTask = m('input', {
    size: 30, required: true, placeholder: 'Add new todo here',
    onchange: m.withAttr('value', todo.vm.description),
    value: todo.vm.description()
  });
  var addTaskButton = m('button.pure-button.pure-button-primary', {
    onclick: todo.vm.add}, 'Add');
  var removeTaskButton = m('button.pure-button.button-error', {
    onclick: todo.vm.remove}, 'Remove');

  return m('div#container', [
      m('ul.todo', [taskList, newTask, addTaskButton, removeTaskButton])]);
}


m.module(
    document.body,
    {controller: todo.controller, view: todo.view});

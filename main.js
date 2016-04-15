'use strict';

$(function() {
  renderList();
  $('button.addName').click(addName);
  $('.nameList').on('dblclick', 'li.name', removeName);
});

function renderList() {
  var names = NameStorage.get();
  var $lis = names.map(name => $('<li>').addClass('name').text(name) );
  $('.nameList').empty().append($lis);
}

function removeName(event) {
  debugger;
  var index = $(this).index();

  var names = NameStorage.get();
  names.splice(index, 1); // modify
  NameStorage.write(names);

  renderList();
}

function addName() {
  var newName = $('.newName').val();
  $('.newName').val('');

  var names = NameStorage.get();
  names.push(newName); // modify
  NameStorage.write(names);

  renderList();
}

var NameStorage = {
  get: function() {
    try {
      var names = JSON.parse(localStorage.names);
    } catch(err) {
      var names = [];
    }
    return names;
  },
  write: function(names) {
    localStorage.names = JSON.stringify(names);
  }
};































// var $json;
// var $keyInput;
// var $valueInput;

// $(function() {
//   $json = $('.json');
//   $keyInput = $('input.key');
//   $valueInput = $('input.value');

//   $json.text(Storage.getStr('myObj'));

//   $('form.valueForm').submit(setValue);
// });

// var Storage = {
//   getObj: function(key) {
//     try {
//       var str = localStorage[key];
//       var obj = JSON.parse(str);
//     } catch(err) {
//       var obj = {};
//     }
//     return obj;
//   },
//   getStr: function(key) {
//     var obj = this.getObj(key);
//     return JSON.stringify(obj, null, 2);
//   },
//   write: function(key, obj) {
//     var str = JSON.stringify(obj);
//     localStorage[key] = str;
//   }
// };


// function setValue(e) {
//   e.preventDefault();

//   // retrieve strings from inputs
//   var key = $keyInput.val();
//   var value = $valueInput.val();

//   // clear inputs
//   $keyInput.val('');
//   $valueInput.val('');

//   // read from localStorage
//   var ob = Storage.getObj('myObj');  // READ and PARSE

//   // update object
//   ob[key] = value;  // MODIFY

//   // write to localStorage
//   Storage.write('myObj', ob);  // STRINGIFY and WRITE

//   // update DOM
//   $json.text(JSON.stringify(ob, null, 2));
// }

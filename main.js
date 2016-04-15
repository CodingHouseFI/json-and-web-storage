'use strict';

var $json;
var $keyInput;
var $valueInput;

$(function() {
  $json = $('.json');
  $keyInput = $('input.key');
  $valueInput = $('input.value');

  $json.text(Storage.getStr('myObj'));

  $('form.valueForm').submit(setValue);
});

var Storage = {
  getObj: function(key) {
    try {
      var str = localStorage[key];
      var obj = JSON.parse(str);
    } catch(err) {
      var obj = {};
    }
    return obj;
  },
  getStr: function(key) {
    var obj = this.getObj(key);
    return JSON.stringify(obj, null, 2);
  },
  write: function(key, obj) {
    var str = JSON.stringify(obj);
    localStorage[key] = str;
  }
};


function setValue(e) {
  e.preventDefault();

  // retrieve strings from inputs
  var key = $keyInput.val();
  var value = $valueInput.val();

  // clear inputs
  $keyInput.val('');
  $valueInput.val('');

  // read from localStorage
  var ob = Storage.getObj('myObj');

  // update object
  ob[key] = value;

  // write to localStorage
  Storage.write('myObj', ob);

  // update DOM
  $json.text(Storage.getStr('myObj'));
}

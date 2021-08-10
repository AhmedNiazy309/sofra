$(document).ready(function() {
  var newImgpre = $('#newImg').attr('src')
  var myArray = [];
  var storageKey = 'myToDoList';
  var firstVisit = main(storageKey);
  $("#moreText").hide();
  function main(storageKey) {
    var firstVisit = true;
    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem(storageKey)) {
        firstVisit = true;
        $('#newItemForm').before('<p class="alert alert-success text-center"' +
          ' id="firstTimeAlert">' +
          ' please Use the form to create' +
          ' your first item.</p>');
        $('#paraToHideForm').hide();
        $('#toDoDataRow').hide();
      } else {
        firstVisit = false;
        $('#newItemForm').hide();
        myArray = JSON.parse(localStorage.getItem(storageKey));
        writeOutToDoList();
      }
    } else {
      $('#newItemForm').before('<p class="alert alert-danger text-center">Oh, ' +
        'no! Your browser does not support local storage!</p>');
      $('#newItemForm').hide();
      $('#toDoDataRow').hide();
    }
    return firstVisit;
  }
  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  function writeOutToDoList() {
    var string = "";
    for (var i = 0; i < myArray.length; i++) {
      var itemname = myArray[i].name;
      var descrip = myArray[i].descrip;
      var duedate = myArray[i].date;
      var newImg = myArray[i].newImg;
      var removalIndex = i;
      var itemstring = '<div class="panel panel-default">' +
      '<div class="panel-body">' +
      '<div class="container-fluid">' +
      '<div class="row">' +
      '<div class="col-md-6">' +
      '<div class="details">' +
      '<h1>' + itemname + '</h1>'+
      '<h3>' + descrip + '</h3>'+
         '</div>' +
         '</div>' +
        '<div class="col-md-6 text-center">' +
        '<img src = " ' + newImg + ' " class="img-fluid img" >'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="panel-footer">' +
        '<span class="checkbox floater">' +
        '<label><input type="checkbox" name="removeThis" value="' +
        removalIndex + '"> Remove</label></span>' +
        'DUE: ' + duedate + '</div> </div>';
      string += itemstring;
    }
    $('#toDoDataRow').show();
    $('#toDoData').html("").append(string);
  }
  function getFormData() {
    var newItem = $('#itemname').val();
    var newDescrip = $('#descrip').val();
    var newDate = $('#duedate').val();
    var newImgpre = $('#newImg').attr('src')
    $('#itemname').val("");
    $('#duedate').val("");
    $('#descrip').val("");
    $('#newImg').val("");

    // assign object properties
    var toDoItem = new Object();
    toDoItem.name = newItem;
    toDoItem.descrip = newDescrip;
    toDoItem.date = newDate;
    toDoItem.newImg = newImgpre;
    myArray.push(toDoItem);
    localStorage.setItem(storageKey, JSON.stringify(myArray));
    $('#toDoDataRow').show();
    writeOutToDoList();
    $('#newItemForm').slideUp();
  }
  function handleCheckboxes() {
    var indexes = [];
    $('input[type=checkbox]').each(function() {
      if (this.checked) {
        indexes.push($(this).val());
      }
    });
    indexes.sort(function(a, b) {
      return a - b;
    });
    return indexes;
  }
  $('#newItemForm').submit(function(e) {
    e.preventDefault();
    if (firstVisit) {
      firstVisit = false;
      $('#firstTimeAlert').hide();
      $('#paraToHideForm').show();
    }
    getFormData();
    console.log($('#newImg').attr('src'));
  });
  $('#hideForm').click(function(e) {
    e.preventDefault();
    $('#newItemForm').hide();
    writeOutToDoList();
  });
  $('#showForm').click(function(e) {
    e.preventDefault();
    $('#newItemForm').show();
    $('#toDoDataRow').hide();
  });
  $('.removeAll').click(function(e) {
    var indexes = handleCheckboxes();
    while (indexes.length > 0) {
      var i = indexes.pop();
      myArray.splice(i, 1);
    }    localStorage.setItem(storageKey, JSON.stringify(myArray));
    $('#toDoDataRow').hide();
    writeOutToDoList();
  });
  $('#sortDate').click(function(e) {
    myArray.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    writeOutToDoList();
  });
  $("#showMore").click(function(e) {
    $("#moreText").slideDown();
    $(this).hide();
  });

  $("#showLess").click(function(e) {
    $("#moreText").slideUp();
    $("#showMore").show();
  });

}); 
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#newImg').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}
$("#imgInp").change(function(){
  readURL(this);
});


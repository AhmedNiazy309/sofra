$(document).ready(function(){
    $(".receive").click(function(){
      let selectedSecttion = $(this).closest('.current-card')
      $(".accept").click(function(){
        selectedSecttion.remove();
        console.log(selectedSecttion);
        $("#receive").modal('hide');
      })
    });
    $(".refuse").click(function(){
      let selectedSecttion = $(this).closest('.current-card')
      $(".refuseorder").click(function(){
        selectedSecttion.remove();
        console.log(selectedSecttion);
        $("#refuse").modal('hide');
      })
    });
  });
  //refuse
  function acceptvalue()
  {
  var value = parseInt(document.getElementById('acceptnumber').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('acceptnumber').value = value;
  }
  function refusevalue()
  {
  var value = parseInt(document.getElementById('refucenumber').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('refucenumber').value = value;
  }
  
function buildList(){

   var text = document.getElementById("search_box");
   var date = document.getElementById("datepicker");

   $.ajax({
        type: 'POST',
        url: '/WishList',
        data: {search: text.value, date: date.value},
        success: function (result) {

            var span =  document.getElementById("location");

            span.innerHTML += "Location: " + text.value + " Date: " + date.value + "<br />";
            date.value = "";
            text.value = "";
            text.focus();
        },
        error: function (result) {
            alert(result[0]);
        }
    });
}
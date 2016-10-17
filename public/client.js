var socket = io();
$('#m').focus();
$.get("/messages", function(data) {
  $.each(data, function(index, value) {
    $("#messages").append($('<li>').text(value));
  });
});
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    $('#m').focus();
    return false;
  });
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
socket.on('clear chat', function(msg) {
  $('#messages').empty();
});
$('#clear').click(function() {
  $.get("/clear");
});

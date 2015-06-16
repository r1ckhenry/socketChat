// Connect to the server
var socket = io.connect('http://localhost:3000');

// On the connected socket...
socket.on('connected', function() {
  $('.connecting').slideUp();
  $('input').attr('disabled', false);
})

// On the chat socket...
socket.on('chat', function(data) {
  writeLine(data.name, data.line)
});

function writeLine(name, line) {
  $('.chatlines').append('<li class="talk"><span class="nick"><em>' + name + ':</em></span> ' + line + '</li>');
}

$(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    var $name = $('#nick');
    var $line = $('#text');
    socket.emit('chat', {name: $name.val(), line: $line.val()})
    writeLine($name.val(), $line.val());
    $line.val("");
  })
})

// On the button actions socket

socket.on('action', function(data) {
  writeAction(data.name, data.action);
});

function writeAction(name, action) {
  var actionStrings = {'trout': 'slaps the room around with a large trout',
                       'rofl': 'rolls around on the floor laughing',
                       'sad': 'looks rather sad :(',
                       'boost': 'scatters Boost around the room liberally.'};
  $('.chatlines').append('<li class="action">' + name + ' ' + actionStrings[action] + '</li>');
}


$(function(){
  $('.actions button').on('click', function(e){
    var $name = $('#nick');
    var $button = $(e.currentTarget);
    socket.emit('action', {name: $name.val(), action: $button.data('type')})
    writeAction($name.val(), $button.data('type'));
  });
});


























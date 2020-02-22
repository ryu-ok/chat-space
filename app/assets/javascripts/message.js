$(function(){ 

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="top">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="created_at">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="bottom-message">` +
          `<p class="bottom-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="bottom-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="top">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="created_at">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="bottom-message">` +
          `<p class="bottom-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="top">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="created_at">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="bottom-message">` +
          `<img src="` + message.image + `" class="bottom-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
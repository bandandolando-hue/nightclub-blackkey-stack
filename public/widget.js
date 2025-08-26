(function(){
  var host = document.currentScript.getAttribute('data-host') || window.location.origin;
  var eventId = document.currentScript.getAttribute('data-event-id');
  var ref = document.currentScript.getAttribute('data-ref') || '';
  if(!eventId){ console.error('nightclub widget: missing data-event-id'); return; }
  var iframe = document.createElement('iframe');
  iframe.style.width = '100%'; iframe.style.border = '0'; iframe.style.height = '480px';
  iframe.src = host + '/widget?eventId=' + encodeURIComponent(eventId) + (ref ? ('&ref=' + encodeURIComponent(ref)) : '');
  document.currentScript.parentNode.insertBefore(iframe, document.currentScript);
})();

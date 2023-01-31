function removeHtmlExtension() {

  var path = window.location.pathname;

  if (path.endsWith(".html")) {

    path = path.slice(0, -5);

    window.history.replaceState(null, null, path);

  }

}

removeHtmlExtension();


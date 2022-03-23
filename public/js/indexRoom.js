function openPage(indice, content) {
  const url = `/${indice}.ejs`;

  const xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.querySelector(content).innerHTML = xml.responseText;
    }
  };

  xml.open('GET', url, true);

  xml.send();
}

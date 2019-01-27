let renderTextInput = function(idInBlueprint, id, obj) {
  return (`
    <div class="field mb-2">
      <div class="fieldDots"></div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">${id}</span>
        </div>
        <input type="text" class="form-control" autocomplete="off" id="${idInBlueprint}" value="${(obj.default) ? obj.default : ""}""
      </div>
    </div>
  </div>
  `);
}

let renderIntegerInput = function(idInBlueprint, id, obj) {
  return (`
    <div class="field mb-2">
      <div class="fieldDots"></div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">${id}</span>
        </div>
        <input type="number" class="form-control" autocomplete="off" id="${idInBlueprint}">
      </div>
    </div>
  `);
}

let renderImageInput = function(idInBlueprint, id, obj) {
  return (`
    <div class="field mb-2">
      <div class="fieldDots"></div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">${id}</span>
        </div>
        <div class="form-control" style="padding: 3px">
          <input type="file" class="form-control-file" autocomplete="off" id="${idInBlueprint}">
        </div>
      </div>
    </div>
  `);
}

let renderMap = function(id, id, obj) {
  return (`
    <div class="field mb-2">
      <div class="fieldDots"></div>
      <div class="input-group" onclick="requireClick(this)">
        <div class="input-group-prepend">
           <span class="input-group-text">${id} ${!obj.required ? `<span class="badge badge-pill badge-secondary">Not In Use</span><span class="badge badge-pill badge-dark">In Use</span>` : ''}</span>
        </div>
      </div>
      <div class="mapContent mt-2" ${!obj.required ? `style="display: none"`: ''}>
        <div class="vert-dots"></div>
        ${renderContent(obj.children)}
      </div>
    </div>
  `);
}

const renderContent = function (blueprint) {
  var html = "";
  for (var id in blueprint) { 
    const element = blueprint[id];
    if (element.type == "string") {
      html += renderTextInput(id, id, element);
    } else if (element.type == "integer") {
      html += renderIntegerInput(id, id, element);
    } else if (element.type == "file") {
      html += renderImageInput(id, id, element);
    }
  }
  for (var id in blueprint) { 
    const element = blueprint[id];
    if (element.type == "map") {
      html += renderMap(id, id, element);
    }
  }
  document.getElementsByTagName("body")[0].innerHTML = html;
  return html;
} 

const requireClick = function(dom) {
  console.log(dom);
  if ($(this).hasClass('inUse')) {
    $(this).next(".mapContent").css('display', 'none');
    $(this).removeClass("inUse");
  } else {
    $(this).next(".mapContent").css('display', 'block');
    $(this).addClass("inUse");
  }
}
  ".requireable"
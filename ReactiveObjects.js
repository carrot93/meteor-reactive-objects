//core object
ReactiveObjects = {}

//set single property
ReactiveObjects.setProperty = function (propObj, propName) {

  //add frame if it does not exist
  if (!propObj._reactiveDeps) {propObj._reactiveDeps = {}}
  if (!propObj._reactiveProperties) { propObj._reactiveProperties = {} }

  //persist the value and do a full cleanup
  if (propObj[propName]) {
    var backup = propObj[propName]
    delete propObj[propName]
  }
  //create the deps if it does not already exist
  var DepsName = propName + "Deps"
  if (propObj._reactiveDeps[DepsName]) { return } //gracefully exit, would throw exception otherwise.
  propObj._reactiveDeps[DepsName] = new Deps.Dependency

  Object.defineProperty(propObj, propName, {

    get: function () {
      propObj._reactiveDeps[DepsName].depend()
      return propObj._reactiveProperties[propName];
    },
   
    set: function (value) {
      propObj._reactiveProperties[propName] = value;
      // (could add logic here to only call changed()
      // if the new value is different from the old)
      propObj._reactiveDeps[DepsName].changed();
    }
   
  });  
  propObj[propName] = backup
  return propObj
}



//set an array of properties, == to set up object
ReactiveObjects.setProperties = function (propObj, propArray) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i])
  };
  return propObj
}


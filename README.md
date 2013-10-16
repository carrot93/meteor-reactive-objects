meteor-reactive-objects
=======================

Objects with clean reactive properties, via ECMA-262 property get/set standards.

Basically ReactiveObjects = Deps + ECMA-262 setProperty function

# Full Spec 'N Test
Travis-ci is currently not able to test Meteor but here is the anyway (it returns passing falsely) [![Build Status](https://travis-ci.org/CMToups/meteor-reactive-objects.png)](https://travis-ci.org/CMToups/meteor-reactive-objects) 

To see the test run `mrt test-packages \<path to package\>`. 
These will always be updated before the readme so if something seems off do check; I will try to keep the doc up-to-date.
There currently are a few failing test as I have writen the full 1.0.0 spec in tinytest. 

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*

Simple Example (more to come)
```js

var reactiveObject = {
  normalProp: 'someObjectProp',
  reativeProp: 'boring value'
}

ReactiveObjects.setProperties(reactiveObject, ['reativeProp', 'otherReativeProp'])



```


Object State
```js
reactiveObject.normalProp
  => 'someObjectProp'
reactiveObject.reativeProp
  => 'boring value' //but its reactive
reactiveObject.otherReativeProp
  => undefined //but its also reative

```

With `Template.example.reactiveObject = reactiveObject`
```html

{{#with ReactiveObject}}
  {{normalProp}}
  {{reativeProp}}
  {{otherReativeProp}}
{{/with}}

```

If you do `reactiveObject.normalProp = "not going to react"` the template will not update, this is normal.
Now however, `reactiveObject.reativeProp = "Something Awesome!"` the template will just update!

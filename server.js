// we include the Express module.
var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// create a object called Storage
var Storage = {
    //  a method to add an item with two properties name and id
    add: function(name) {
        var item = { name: name, id: this.setId };
        // we want to push every item we add into the array
        this.items.push(item);
        // increment the id number by 1 after every item added
        this.setId += 1;
        return item;
    },
    // a method to remove an item
    remove: function(id) {
        // find the "item"'s index whose id is "id"
        for (var index = 0; index < this.items.length; index++) {
            // check to see if the id is the same as the current id in the loop
            if (id == this.items[index].id) {
                // extract that item by using the splice method
                this.items.splice(index, 1);
                break;
            }
        }
        return id;
    },
    // method to edit an item
    edit: function(id, name) {
        // find the "items"'s index whose id is "id"'
        for (var index = 0; index < this.items.length; index++) {
            if (id == this.items[index].id) {
                // here we change the items name to the current name;
                this.items[index].name = name;
                // return "item" when successfully found
                return this.items[index];
            }
        }
        // when nothing happens or not found.
        return {};
    }
};

// we have a function that creates a storage object that uses our "Storage" function
// we'll give storage 2 properties. Empty items array & setId
var createStorage = function() {
    var storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
}

// create a variable called storage where we use createStorage
var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


var app = express();
// tells express to server any static content contained in the public folder
app.use(express.static('public'));

// we use the get request on app and pass in a callback function taking request and response
app.get('/items', function(request, response) {
    response.json(storage.items);
})

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);
})
app.delete('/items/:id', function(request, response) {
    // / No need for  jsonParser wen deleting

    var id = request.params.id; // WILL ALWAYS BE A STRING
    var deleted = storage.remove(id)
    response.status(201).json({});
});

app.put('/items/:id', jsonParser, function(request, response) {
    var id = request.params.id;
    var edited = storage.edit(id, request.body.name);
    response.status(201).json(edited);
})
app.listen(process.env.PORT || 8080);

// export both app and storage
exports.app = app;
exports.storage = storage;

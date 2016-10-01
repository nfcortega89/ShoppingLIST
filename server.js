// we include the Express module.
var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
    add: function(name) {
        var item = { name: name, id: this.setId };
        this.items.push(item);
        this.setId += 1;
        return item;
    },
    remove: function(id) {

        // find the "item"'s index whose id is "id"
        for (var index = 0; index < this.items.length; index++) {
            if (id == this.items[index].id) {
                this.items.splice(index, 1);
                break;
            }
        }
        return id;
    },
    edit: function(id, name) {
        // editin stuff! dah!
        for (var index = 0; index < this.items.length; index++) {
            if (id == this.items[index].id) {
                this.items[index].name = name;
                return this.items[index]; // return "item" when successful found
            }
        }
        return {}; // when nothing happens or not found.

    }
};

var createStorage = function() {
    var storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

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

exports.app = app;
exports.storage = storage;
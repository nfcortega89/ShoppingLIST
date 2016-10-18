// we require the chai, chai-http and the private module
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done){
    	chai.request(app)
    	.get('/items')
    	.end(function(err, res){
    		res.should.have.status(200);
    		done();
    	});
    });
    it('should add an item on post', function(done){
    	chai.request(app)
    	.post('/items')
    	.send({name: 'Kale'})
    	.end(function(err, res){
    		should.equal(err, null); // no error!!! 
    		res.should.have.status(201);
    		done();
    	})
    });
    it('should edit an item on put', function(done){
    	chai.request(app)
    	.put('/items/4')
    	.send({name: 'Potatoes'})
    	.end(function(err, res){
    		storage.items[3].name.should.equal('Potatoes');
    		res.should.have.status(201);
    		done();
    	})
    });
    it('should delete an item on delete', function(done){
    	chai.request(app)
    	.delete('/items/4')
    	.end(function(err, res){
    		storage.items.should.not.have.length.above(3)
    		res.should.have.status(201);
    		done();
    	})
    });
});
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Todo = require("../models/Todo");

const should = chai.should();
chai.use(chaiHTTP);

describe('todos', function () {
    Todo.collection.drop();

    beforeEach(function (done) {
        let todo = new Todo({
            title: 'coding'
        });
        todo.save(function (err) {
            done();
        })
    })

    afterEach(function (done) {
        Todo.collection.drop();
        done()
    })

    it('Should list ALL todo on /todos GET', function (done) {
        chai.request(server)
            .get('/todos')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('todos');
                res.body.success.should.equal(true);
                res.body.todos.should.be.a('array');
                res.body.todos[0].should.have.property('_id');
                res.body.todos[0].should.have.property('title');
                res.body.todos[0].should.have.property('complete');
                res.body.todos[0].title.should.equal('coding');
                res.body.todos[0].complete.should.equal(false);
                done();
            })
    })

    it('Should Add SINGLE todo on /todos POST', function (done) {
        chai.request(server)
            .post('/todos')
            .send({ title: 'BelajarLagi' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('todo');
                res.body.success.should.equal(true);
                res.body.todo.should.be.a('object');
                res.body.todo.should.have.property('_id');
                res.body.todo.should.have.property('title');
                res.body.todo.should.have.property('complete');
                res.body.todo.title.should.equal('BelajarLagi');
                res.body.todo.complete.should.equal(false);
                done();
            })
    })

    it('should update a SINGLE todo on /todos/<id> PUT', function (done) {
        chai.request(server)
            .get('/todos')
            .end(function (err, res) {
                chai.request(server)
                    .put(`/todos/${res.body.todos[0]._id}`)
                    .send({ title: res.body.todos[0].title, complete: true })
                    .end(function (err, response) {
                        response.should.have.status(201);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('todo');
                        response.body.success.should.equal(true);
                        response.body.todo.should.be.a('object');
                        response.body.todo.should.have.property('_id');
                        response.body.todo.should.have.property('title');
                        response.body.todo.should.have.property('complete');
                        response.body.todo.title.should.equal(res.body.todos[0].title);
                        response.body.todo.complete.should.equal(true);
                        done();
                    })
            });
    })

    it('should delete a SINGLE todo on /todos/<id> DELETE', function (done) {
        chai.request(server)
            .get('/todos')
            .end(function (err, res) {
                chai.request(server)
                    .delete(`/todos/${res.body.todos[0]._id}`)
                    .end(function (err, response) {
                        response.should.have.status(201);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('todo');
                        response.body.success.should.equal(true);
                        response.body.todo.should.be.a('object');
                        response.body.todo.should.have.property('_id');
                        response.body.todo.should.have.property('title');
                        response.body.todo.should.have.property('complete');
                        response.body.todo.title.should.equal('coding');
                        response.body.todo.complete.should.equal(false);
                        done();
                    })
            });
    })
});
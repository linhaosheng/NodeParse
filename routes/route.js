/**
 * Created by linhao on 2016/11/19.
 */
var index = require("./index");
var api= require("./api");


module.exports = function (app) {
    app.get("/",index.index);
    app.get("/resource",index.resource);
    app.get("/picture",api.picture);
    app.get("/novel",api.novel);
    app.get("/vedio",api.vedio);
    app.get("/movie",api.movie);
    app.get("/queryPicture",api.queryPicture);
    app.get("/queryNovel",api.queryNovel);
    app.get("/queryVedio",api.queryVedio);
    app.get("/queryMovie",api.queryMovie);
}
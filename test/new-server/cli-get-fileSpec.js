'use strict';

var module = require('../../lib/index');
var setup = module.setup;

var file1 = "test/fixtures/index.html";
var file2 = "test/fixtures/forms.html";
var file3 = "test/fixtures/scrolling.html";

var css = "test/fixtures/assets/style.css";
var scss = "test/fixtures/scss/main.scss";

var cbFun = function () {};

var config = {
    urlTransforms: {
        suffix: null,
        remove: null
    },
    debugInfo: true,
    background: false,
    reloadFileTypes: ['php', 'html', 'js', 'erb'],
    injectFileTypes: ['css', 'png', 'jpg', 'svg', 'gif'],
    host: null,
    ghostMode: {
        links: false,
        forms: false,
        scroll: false
    },
    server: {
        baseDir: "./"
    },
    open: true
};


describe("Style Injector: transform the files option into useable watchers", function () {

    it("can load", function () {
        expect(setup).toBeDefined();
    });

    describe("When getting single files with a string", function () {

        var files;
        var cb;

        beforeEach(function(){
            cb = jasmine.createSpy();
        });

        it("should return an array of files even if only 1 file", function () {

            files = setup.getFiles(file1, cb);

            waits(50);

            runs(function () {
                expect(cb).toHaveBeenCalledWith([file1]);
            });
        });

        it("should return an array of files if an array given", function () {

            files = setup.getFiles([file1, file2], cb);

            waits(50);
            runs(function () {
                expect(cb).toHaveBeenCalledWith([file1, file2]);
            });
        });
    });

    describe("when getting multiple files given as strings", function () {


        describe("When the files DO exist", function () {

            var files = [file1, file2];
            var cb;
            beforeEach(function(){
                cb = jasmine.createSpy("callback1");
            });

            it("should return an array of the files", function () {
                files = setup.getFiles(files, cb);
                waits(50);
                runs(function () {
                    expect(cb).toHaveBeenCalledWith([file1, file2]);
                });
            });
        });
        describe("When the files DO NOT exist", function () {
//
            var files = ["test/fixtures/index.html", "test/fixtures/kittie.html"];
            var cb;
            beforeEach(function(){
                cb = jasmine.createSpy("callback1");
            });

            it("should return an array of the files", function () {

                files = setup.getFiles(files, cb);
                waits(50);

                runs(function () {
                    expect(cb).toHaveBeenCalledWith(["test/fixtures/index.html"]);
                });
            });
        });
    });

    describe("Getting files from a glob", function () {

        var cb;
        var files;
        beforeEach(function(){
            cb = jasmine.createSpy();
        });
        it("should return files from a single glob string", function () {

            files = setup.getFiles("test/fixtures/*.html", cb);
            waits(50);
            runs(function () {
                expect(cb).toHaveBeenCalledWith([file2, file1, file3]);
            });
        });
        it("should return files from an array of globs", function () {
            files = setup.getFiles([
                "test/fixtures/*.html",
                "test/fixtures/assets/*.css",
                "test/fixtures/scss/*.scss"], cb);
            waits(50);
            runs(function () {
                expect(cb).toHaveBeenCalledWith([file2, file1, file3, css, scss]);
            });
        });
    });
});
var buf = require('../buffer.js');
require("setimmediate");

function readBlobHeaderSize(fd, position, size, callback){
    var headerSize = new DataView(fd).getInt32(position, false);
    return callback(null, headerSize);
}

function readPBFElement(fd, position, size, pbfDecode, callback){
    //var buffer = new Uint8Array(fd, position, size);
    var buffer = new Uint8Array(size);
    buffer.set(new Uint8Array(fd, position, size));

    // async call to avoid flooding the call stack when reading an already
    // loaded ArrayBuffer in the Browser (#30)
    setImmediate(function(){
        buf.readPBFElementFromBuffer(buffer, pbfDecode, callback);
    });
}

function getFileSize(fd, callback){
    return callback(null, fd.byteLength);
}

function get(opts, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', opts.filePath, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function(evt) {
        callback(new Error(this.status + ': ' + this.statusText));
    };
    xhr.onload = function(evt) {
        callback(null, this.response);
    };
    if (opts.headers) {
        opts.headers.forEach(header => {
            xhr.setRequestHeader(header[0], header[1]);
        });
    }
    xhr.send();
}

function open(opts, callback){
    if (opts.filePath) {
        get(opts, callback);
    } else if (opts.buffer) {
        callback(null, opts.buffer);
    } else {
        callback(new Error('Use either the "filePath" option to pass an URL'
            + ' or the "buffer" option to pass an ArrayBuffer.'));
    }
}

function close(fd, callback){
    if (callback) {
        callback(null);
    }
}

module.exports = {
    readBlobHeaderSize: readBlobHeaderSize,
    readPBFElement: readPBFElement,
    getFileSize: getFileSize,
    open: open,
    close: close
};

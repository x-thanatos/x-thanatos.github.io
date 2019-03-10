'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Copyright (c) 2018 Victor Ribeiro - victorqribeiro@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/victorqribeiro/imgToAscii

*/

var imgToAscii = function () {
    function imgToAscii(image, size, charType) {
        var _this = this;

        _classCallCheck(this, imgToAscii);

        this.size = (size <= 0 || size > 1 ? 1 : size) || 1;
        this.charType = charType || 0;
        this.alphabet = {
            0: ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '],
            1: ['$', '@', 'B', '%', '8', '&', 'W', 'M', '#', '*', 'o', 'a', 'h', 'k', 'b', 'd', 'p', 'q', 'w', 'm', 'Z', 'O', '0', 'Q', 'L', 'C', 'J', 'U', 'Y', 'X', 'z', 'c', 'v', 'u', 'n', 'x', 'r', 'j', 'f', 't', '/', '\\', '|', '(', ')', '1', '{', '}', '[', ']', '?', '-', '_', '+', '~', '\<', '\>', 'i', '!', 'l', 'I', ';', ':', ',', '"', '^', '`', '\'', '.', ' ']
        };
        this.string = '';
        this.stringColor = '';
        this.imageSrc = image;
        this.loadImage = new Promise(function (resolve, reject) {
            _this.image = new Image();
            _this.image.src = _this.imageSrc;
            _this.image.onload = function () {
                _this.canvas = document.createElement('canvas');
                _this.canvas.width = _this.image.width * _this.size;
                _this.canvas.height = _this.image.height * _this.size;
                _this.context = _this.canvas.getContext('2d');
                _this.context.drawImage(_this.image, 0, 0, _this.canvas.width, _this.canvas.height);
                _this.imageData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
                var grayStep = Math.ceil(255 / _this.alphabet[_this.charType].length);
                for (var i = 0; i < _this.imageData.data.length; i += 4) {
                    for (var j = 0; j < _this.alphabet[_this.charType].length; j++) {
                        var r = _this.imageData.data[i];
                        var g = _this.imageData.data[i + 1];
                        var b = _this.imageData.data[i + 2];
                        if (r * 0.2126 + g * 0.7152 + b * 0.0722 < (j + 1) * grayStep) {
                            _this.string += _this.alphabet[_this.charType][j];
                            _this.stringColor += '<span style="color: rgb(' + r + ',' + g + ',' + b + '); ">' + _this.alphabet[_this.charType][j] + '</span>';
                            break;
                        }
                    }
                    if (!((i / 4 + 1) % _this.canvas.width)) {
                        _this.string += '\n';
                        _this.stringColor += '<br>';
                    }
                }
                resolve();
            };
            _this.image.error = reject;
        }).catch(function (e) {
            return console.error(e);
        });
    }

    _createClass(imgToAscii, [{
        key: 'display',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var pre;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                pre = document.createElement('pre');

                                pre.style.fontFamily = 'Courier, monospace';
                                pre.style.lineHeight = '6px';
                                pre.style.fontSize = '11px';
                                pre.style.display = 'inline-block';
                                document.body.appendChild(pre);
                                _context.next = 8;
                                return this.loadImage;

                            case 8:
                                pre.innerText = this.string;

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function display() {
                return _ref.apply(this, arguments);
            }

            return display;
        }()
    }, {
        key: 'displayColor',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(el, bg) {
                var container, items, length, i, render, timer;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                render = function render() {
                                    items[i].style.opacity = 1;
                                    i += 1;
                                };

                                container = el || document.createElement('div');

                                container.style.fontFamily = 'Courier, monospace';
                                container.style.lineHeight = '6px';
                                container.style.fontSize = '11px';
                                container.style.display = 'inline-block';
                                container.style.backgroundColor = bg;
                                if (!el) {
                                    document.body.append(container);
                                }
                                _context2.next = 10;
                                return this.loadImage;

                            case 10:
                                container.innerHTML = this.stringColor;
                                items = container.childNodes;
                                length = items.length;
                                i = 0;
                                timer = setInterval(function () {
                                    render();
                                    if (i >= length) {
                                        var h3 = document.createElement('h3');
                                        h3.innerHTML = 'Complete!(' + length + ' point)';
                                        container.append(h3);
                                        clearInterval(timer);
                                    }
                                }, 1);

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function displayColor(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return displayColor;
        }()
    }]);

    return imgToAscii;
}();

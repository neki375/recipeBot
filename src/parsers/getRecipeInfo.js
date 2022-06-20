"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getRecipeInfo = void 0;
var cheerio = require("cheerio");
var needle = require("needle");
function getData(link) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, needle('get', link)
                        .then(function (response) {
                        return response.body;
                    })["catch"](function (err) {
                        console.log(err);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getRecipeInfo(link, img) {
    return __awaiter(this, void 0, void 0, function () {
        var info, res, $, title, portions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(link);
                    info = {
                        img: '',
                        title: '',
                        portions: '',
                        ings: [],
                        desc: []
                    };
                    return [4 /*yield*/, getData(link)];
                case 1:
                    res = _a.sent();
                    $ = cheerio.load(res);
                    info.img = img;
                    title = $('.emotion-gl52ge').text();
                    portions = $('.emotion-1047m5l').text();
                    $('.emotion-13pa6yw').find('.emotion-7yevpr').each(function (_index, element) {
                        var name = ($(element).find('.emotion-ydhjlb > .emotion-bjn8wh > span').text());
                        var count = ($(element).find('.emotion-ydhjlb > .emotion-15im4d2').text());
                        info.ings.push(name + '-' + count.replace(/,/g, ''));
                    });
                    info.title = title;
                    info.portions = portions;
                    $('.emotion-1ywwzp6').find('.emotion-122mebg').each(function (_index, element) {
                        var count = ($(element).find('.emotion-bzb65q').text());
                        var desc = ($(element).find('.emotion-6kiu05').text());
                        info.desc.push("".concat(count, ".") + ' ' + desc.replace(/,/g, ''));
                    });
                    if (!info.desc.length) {
                        $('.emotion-1ywwzp6').find('.emotion-19fjypw').each(function (_index, element) {
                            var count = ($(element).find('.emotion-bzb65q').text());
                            var desc = ($(element).find('.emotion-6kiu05').text());
                            info.desc.push("".concat(count, ".") + ' ' + desc.replace(/,/g, ''));
                        });
                    }
                    info.desc = info.desc.join(',').replace(/,/g, ';').split(';', undefined);
                    return [2 /*return*/, info];
            }
        });
    });
}
exports.getRecipeInfo = getRecipeInfo;

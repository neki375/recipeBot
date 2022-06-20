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
exports.Bot = void 0;
var telegraf_1 = require("telegraf");
var Reader_1 = require("./data/Reader");
var getRecipeInfo_1 = require("./parsers/getRecipeInfo");
var Bot = /** @class */ (function () {
    function Bot(token) {
        this.bot = new telegraf_1.Telegraf(token);
    }
    Bot.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.bot.start(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var firstDishes, secondDishes, salads, infoFirstDish, infoSecondtDish, salatInfo, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, (0, Reader_1.readFile)('./infoFiles/soups.txt')];
                            case 1:
                                firstDishes = _d.sent();
                                return [4 /*yield*/, (0, Reader_1.readFile)('./infoFiles/secondDish.txt')];
                            case 2:
                                secondDishes = _d.sent();
                                return [4 /*yield*/, (0, Reader_1.readFile)('./infoFiles/salats.txt')];
                            case 3:
                                salads = _d.sent();
                                ctx.replyWithHTML('Ищу..');
                                return [4 /*yield*/, (0, getRecipeInfo_1.getRecipeInfo)(firstDishes.link, firstDishes.img)];
                            case 4:
                                infoFirstDish = _d.sent();
                                return [4 /*yield*/, (0, getRecipeInfo_1.getRecipeInfo)(secondDishes.link, secondDishes.img)];
                            case 5:
                                infoSecondtDish = _d.sent();
                                return [4 /*yield*/, (0, getRecipeInfo_1.getRecipeInfo)(salads.link, salads.img)];
                            case 6:
                                salatInfo = _d.sent();
                                _b = (_a = Promise).all;
                                return [4 /*yield*/, this.resipeView(ctx, infoFirstDish.title, infoFirstDish.img, infoFirstDish.ings, infoFirstDish.desc)];
                            case 7:
                                _c = [
                                    _d.sent()
                                ];
                                return [4 /*yield*/, this.resipeView(ctx, salatInfo.title, salatInfo.img, salatInfo.ings, salatInfo.desc)];
                            case 8:
                                _c = _c.concat([
                                    _d.sent()
                                ]);
                                return [4 /*yield*/, this.resipeView(ctx, infoSecondtDish.title, infoSecondtDish.img, infoSecondtDish.ings, infoSecondtDish.desc)];
                            case 9:
                                _b.apply(_a, [_c.concat([
                                        _d.sent()
                                    ])]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.bot.on('message', function (ctx) { return ctx.reply('Для получения рецептов напишите /start'); });
                this.bot.launch();
                return [2 /*return*/];
            });
        });
    };
    Bot.prototype.resipeView = function (ctx, title, img, ings, steps) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, ctx.replyWithPhoto({ url: img }, { caption: title })];
                    case 1:
                        _c = [
                            _d.sent()
                        ];
                        return [4 /*yield*/, ctx.replyWithHTML(ings.join(',').replace(/,/g, '\n'))];
                    case 2:
                        _c = _c.concat([
                            _d.sent()
                        ]);
                        return [4 /*yield*/, ctx.replyWithHTML(steps.join(',').replace(/,/g, '\n'))];
                    case 3: return [2 /*return*/, _b.apply(_a, [_c.concat([
                                _d.sent()
                            ])])];
                }
            });
        });
    };
    return Bot;
}());
exports.Bot = Bot;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Disposition_1 = __importDefault(require("../models/Disposition"));
const users = [
    { id: '4a737d88-0b1b-45dc-96f9-4b5e9d4ad5ce', name: 'Yurozzavr' },
    { id: 'c699a58a-72ca-4bde-b74c-5b957f9b1cf2', name: 'Valcyria' },
    { id: '15888e46-6e09-494f-ac7a-9903b3b09bcd', name: 'Wizzard' },
];
const resolvers = {
    Query: {
        users: () => users,
        dispositions: () => __awaiter(void 0, void 0, void 0, function* () {
            const dispositions = yield Disposition_1.default.find({});
            return dispositions;
        }),
    }
};
exports.default = resolvers;

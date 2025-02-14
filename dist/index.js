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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'build', 'index.html'));
});
// Endpoint to shorten URLs
app.post("/shorten", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return;
        }
        const response = yield axios_1.default.post("https://cleanuri.com/api/v1/shorten", new URLSearchParams({ url }));
        res.json(response.data);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to shorten URL" });
    }
}));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

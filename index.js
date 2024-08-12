import { StartService } from './src/service.js';
import dotenv from 'dotenv';
import path from "path";
dotenv.config({
    path: path.resolve('.env')
});

StartService();

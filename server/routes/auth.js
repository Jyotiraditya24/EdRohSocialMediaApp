import express from 'express';

const app = express;
const router = express.Router();

router.get('/login',login)
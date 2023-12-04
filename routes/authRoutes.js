import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

//router object
const router = express.Router();

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: Object
 *    required:
 *     - name
 *     - lastName
 *     - email
 *     - password
 *     - location
 *    properties:
 *      id:
 *        type: string
 *        description: The Auto-generated ID of user collection
 *        example: GDHJGD788BJBJ
 *      name:
 *        type: string
 *        description: User name
 *        example: John
 *      lastName:
 *        type: string
 *        description: User Last Name
 *        example: Doe
 *      email:
 *        type: string
 *        description: User email address
 *        example: johndoe@gmail.com
 *      password:
 *        type: string
 *        description: User password should be greater than 6 charecter
 *        example: John@123
 *      location:
 *        type: string
 *        description: User location city or country
 *        example: mumbai
 *    example:
 *      id: DHJDBSI7887
 *      name: John
 *      lastName: Doe
 *      email: johndoe@gmail.com
 *      password: John@123
 *      location: mumbai
 */

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: internal server error
 */

//register || POST
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 *
 */

//Login || POST
router.post("/login", limiter, loginController);

export default router;

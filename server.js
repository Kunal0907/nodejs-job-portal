//API documentation
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//packages imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//files imports
import connectDB from "./config/db.js";
//routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//swagger api config
//swagger api options
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Job Portal",
      description: "Node ExpressJS Job Portal Application",
    },
    servers: [
      {
        // url: "http://localhost:8000",
        url: "https://nodejs-job-portal-r8xz.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//home routes root
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(spec));

//validation middlewares
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
  );
});

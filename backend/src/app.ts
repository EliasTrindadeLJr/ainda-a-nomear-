import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import routes from './routes'
import authRoutes from "./routes/auth.route";
dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());

app.get('/health', (req: any, res: any) => {
    res.json({ ok: true, uptime: process.uptime() })
});

app.get("/api/teste", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

app.use('/api', routes);
app.use("/api/auth", authRoutes);
export default app;
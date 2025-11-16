import { configDotenv } from "dotenv";
import app from "./src/app";

configDotenv();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
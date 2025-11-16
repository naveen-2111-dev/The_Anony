import { configDotenv } from "dotenv";
import app from "./src/app"; configDotenv();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
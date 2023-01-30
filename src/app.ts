import { Server, sendPage } from "./Server"
import IndexPage from "./pages/index";

const app = new Server();
const port = 8080;

app.get("/", async (req, res) => {
    sendPage(res, "Home", IndexPage, { msg: "EIA!" });
    res.end();
});

app.error((err) => { throw err; });
app.listen(port, () => {
    console.log("Listening at port " + port);
});

import Server from "./Server"

const app = new Server();
const port = 8080;

app.get("/", (req, res) => {
    res.write("heiya");
    res.end();
});

app.get("/gato", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<img style="position:absolute;left:0;right:0;margin:0 auto;height:90vh;" src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F002%2F496%2F287%2Fac2.jpg" />');
    res.end();
});

app.error((err) => { throw err; });
app.listen(port, () => {
    console.log("Listening at port " + port);
});

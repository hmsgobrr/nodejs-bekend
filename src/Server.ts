import * as http from "http"

interface RouteFunc {
    route: string;
    call: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

// http server abstraction
export default class Server {
    httpServer: http.Server = http.createServer();
    private routeFuncs: RouteFunc[] = [];

    get(route: string, func: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
        this.routeFuncs.push({ route, call: func });
    }

    error(callback: (error: Error) => void) {
        this.httpServer.on("error", callback);
    }

    listen(port: number, callback?: () => void) {
        this.httpServer.on("request", (req, res) => {
            if (req.method == "GET") {
                const pathname = new URL(req.url || "", "http://" + req.headers.host).pathname;
                this.routeFuncs.forEach(({ route, call }) => {
                    if (pathname === route) call(req, res);
                });
            }
        });

        this.httpServer.listen(port, callback);
    }
}

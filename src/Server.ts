import * as http from "http"
import { render } from "preact-render-to-string"
import { VNode } from "preact"

type RouteFuncType = (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;

interface RouteFunc {
    route: string;
    call: RouteFuncType;
}

export function sendPage(res: http.ServerResponse, title: string, jsx: (params: any) => VNode, params: any) {
    res.writeHead(200, { "Content-Type": "text/html" });
    const htmlText =
        '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
            '<meta charset="UTF-8">' +
            '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
            '<title>' + title + '</title>' +
        '</head>' +
        '<body>' +
            render(jsx(params)) +
        '</body>' +
        '</html>'
    res.write(htmlText);
}

// http server abstraction
export class Server {
    httpServer: http.Server = http.createServer();
    private routeFuncs: RouteFunc[] = [];

    get(route: string, func: RouteFuncType) {
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

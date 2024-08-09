import { join } from "node:path";
// Returns the route filesystem path when given a URL
export const routeMatcher = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: "./api",
    fileExtensions: [".ts", ".js"],
});

// Transform routes to be relative to the server/api directory
let routes = routeMatcher.routes;

for (const [route, path] of Object.entries(routes)) {
    routes[route] = path.replace(join(process.cwd()), ".");
    // If route ends with .test.ts, remove the route (it's a duplicate)
    if (route.endsWith(".test")) {
        delete routes[route];
    }
}

// Prevent catch-all routes from being first by reversinbg the order
routes = Object.fromEntries(Object.entries(routes).reverse());

export { routes };

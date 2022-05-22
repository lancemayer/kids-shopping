import {
  Form,
  json, Link, Links, LinksFunction, LiveReload, LoaderFunction, Meta, MetaFunction, Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { useOptionalUser } from "./utils";


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kids Shopping",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  const user = useOptionalUser();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <nav className="bg-blue-500">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between flex-wrap">
              <div className="p-3 flex items-center flex-shrink-0 text-white mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="312" height="74" viewBox="-384.501 305.5 901.319 214.234"><path d="M407.22 377.62c5.02 0 9.152-2.61 9.71-5.982l4.956-56.05c0-5.54-6.49-10.088-14.65-10.088-8.152 0-14.636 4.548-14.636 10.089l4.953 56.049c.545 3.371 4.677 5.982 9.684 5.982h-.017M376.927 395.127c2.518-4.342 2.328-9.222-.326-11.39l-46.07-32.317c-4.79-2.774-11.972.565-16.048 7.634-4.09 7.06-3.365 14.945 1.412 17.72l51.013 23.752c3.189 1.182 7.537-1.093 10.035-5.432l-.016.033M437.54 395.097c2.514 4.339 6.84 6.615 10.032 5.432l51.013-23.752c4.807-2.774 5.49-10.66 1.438-17.72-4.096-7.062-11.291-10.408-16.068-7.634l-46.073 32.317c-2.634 2.165-2.83 7.049-.326 11.39l-.016-.033M407.22 447.635c5.02 0 9.152 2.588 9.71 5.963l4.956 56.042c0 5.557-6.49 10.095-14.65 10.095-8.152 0-14.636-4.538-14.636-10.095l4.953-56.042c.545-3.375 4.677-5.963 9.684-5.963h-.017M437.54 430.124c2.514-4.351 6.84-6.607 10.032-5.411l51.013 23.736c4.807 2.777 5.49 10.67 1.438 17.736-4.096 7.039-11.291 10.394-16.068 7.624l-46.073-32.287c-2.634-2.182-2.83-7.069-.326-11.407h-.02M376.927 430.118c2.518 4.335 2.328 9.222-.326 11.408l-46.07 32.286c-4.79 2.77-11.972-.585-16.048-7.624-4.09-7.066-3.365-14.959 1.412-17.736l51.013-23.736c3.189-1.196 7.537 1.06 10.035 5.412h-.016" fill="#fdbb30" /><path d="M116.622 441.42c0 1.72-.153 3.494-.624 5.052-1.954 6.471-8.654 11.943-17.036 11.943-6.989 0-12.54-3.97-12.54-12.355 0-12.833 14.125-16.377 30.204-16.288l-.004 11.647zm25.22-22.364c0-21.161-9.042-39.781-39.594-39.781-15.683 0-28.13 4.405-34.924 8.331l4.976 17.012c6.209-3.92 16.105-7.165 25.47-7.165 15.497-.043 18.035 8.776 18.035 14.42v1.336c-33.781-.05-55.135 11.647-55.135 35.475 0 14.56 10.876 28.197 29.782 28.197 11.617 0 21.347-4.637 27.17-12.072h.575s3.853 16.142 25.124 9.966c-1.11-6.713-1.475-13.879-1.475-22.496l-.003-33.223M-384.5 350.457s22.075 90.454 25.6 105.134c4.112 17.135 11.523 23.443 32.88 19.184l13.783-56.078c3.495-13.936 5.834-23.872 8.086-38.034h.392c1.581 14.312 3.824 24.141 6.7 38.08 0 0 5.608 25.46 8.485 38.828 2.88 13.364 10.896 21.792 31.818 17.204l32.844-124.322h-26.51l-11.218 53.753c-3.016 15.64-5.75 27.875-7.86 42.18h-.375c-1.917-14.179-4.358-25.915-7.421-41.157l-11.67-54.776h-27.626l-12.49 53.395c-3.535 16.23-6.85 29.33-8.95 43.159h-.382c-2.156-13.022-5.026-29.493-8.132-45.196 0 0-7.415-38.193-10.023-51.358l-27.931.004M-173.766 441.42c0 1.72-.153 3.494-.631 5.052-1.95 6.471-8.654 11.943-17.036 11.943-6.99 0-12.533-3.97-12.533-12.355 0-12.833 14.121-16.377 30.203-16.288l-.003 11.647zm25.217-22.364c0-21.161-9.042-39.781-39.588-39.781-15.687 0-28.144 4.405-34.934 8.331l4.97 17.012c6.208-3.92 16.104-7.165 25.472-7.165 15.508-.043 18.046 8.776 18.046 14.42v1.336c-33.795-.05-55.139 11.647-55.139 35.475 0 14.56 10.87 28.197 29.762 28.197 11.633 0 21.357-4.637 27.187-12.072h.568s3.864 16.142 25.13 9.966c-1.112-6.713-1.474-13.879-1.474-22.496v-33.223M-106.463 448.385v-97.928h-25.25v124.322h25.25v-26.394M223.853 350.457v91.71c0 12.65 2.385 21.503 7.47 26.921 4.456 4.737 11.777 7.803 20.557 7.803 7.468 0 14.81-1.425 18.275-2.71l-.326-19.726c-2.578.63-5.538 1.14-9.59 1.14-8.604 0-11.481-5.512-11.481-16.863v-35.09h21.988v-23.79h-21.988v-29.395h-24.905M158.679 381.384v93.395h26.047v-47.82c0-2.585.156-4.837.565-6.897 1.927-10.022 9.587-16.42 20.59-16.42 3.016 0 5.175.328 7.514.66v-24.45c-1.963-.391-3.295-.574-5.737-.574-9.72 0-20.779 6.272-25.42 19.726h-.704v-17.62h-22.855M-88.783 381.384v93.395h25.377v-54.767c0-2.57.302-5.288 1.192-7.644 2.103-5.514 7.235-11.972 15.424-11.972 10.245 0 15.029 8.657 15.029 21.151v53.225h25.357v-55.434c0-2.452.335-5.408 1.06-7.57 2.082-6.276 7.61-11.379 15.224-11.379 10.381 0 15.364 8.505 15.364 23.211v51.169h25.374v-55.01c0-29.007-14.73-40.49-31.36-40.49-7.358 0-13.172 1.843-18.43 5.065-4.415 2.72-8.375 6.574-11.83 11.64h-.375c-4.01-10.065-13.445-16.7-25.74-16.7-15.795 0-22.894 8.007-27.2 14.797h-.378v-12.69h-24.088" fill="#f9fbfc" /><path d="M511.38 470.238h.383c.508 0 .834-.21.834-.522 0-.355-.306-.548-.778-.548-.162 0-.328.033-.438.033v1.046-.01zm-.059 2.518h-1.349v-4.395c.306-.06 1.02-.167 1.934-.167.993 0 1.438.14 1.764.36.275.192.475.52.475.963 0 .451-.415.833-1.027 1v.056c.499.133.771.495.914 1.13.136.634.22.893.305 1.056h-1.528c-.133-.163-.212-.552-.302-.94-.086-.445-.296-.668-.747-.668h-.442l.003 1.605zm.558-5.827c-1.937 0-3.398 1.578-3.398 3.59 0 1.96 1.465 3.559 3.451 3.559 1.994.033 3.459-1.598 3.459-3.591 0-1.984-1.465-3.558-3.482-3.558h-.03zm.087-1.193c2.7 0 4.853 2.126 4.853 4.75 0 2.655-2.153 4.784-4.89 4.784s-4.917-2.132-4.917-4.783c0-2.625 2.183-4.75 4.917-4.75h.03" fill="#fdbb30" /></svg>              {/* <img src={logo} alt="walmart logo" width="300px" /> */}
              </div>
              <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded border-yellow-r00 hover:text-white hover:border-white">
                  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
              </div>
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                  <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Items
                  </Link>
                  {/* <Link to="/fruits" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Fruits
                  </Link>
                  <Link to="/drinks" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Drinks
                  </Link>
                  <Link
                    to="/cart"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </Link> */}
                  {user?.email === "lance@example.com" && <Link to="/addItem" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
                    Add Item
                  </Link>}
                  {user?.email === "lance@example.com" && <Link to="/itemManagement" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
                    Item Management
                  </Link>}
                </div>
                <div className="">
                  {user ? (
                    <div>
                      <Form action="/logout" method="post">
                        <button
                          type="submit"
                          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                        >
                          Logout
                        </button>
                      </Form>
                    </div>
                  ) : (
                    <div >
                      <Link
                        to="/join"
                        className="p-3 text-white"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="p-3 text-white"
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingSreen";
import Contact from "../pages/dashboard/Contact";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    //login
    {
      path: "/auth",
      element: <MainLayout/>,
      children: [
        {element: <RegisterPage/>, path: "register"},
        {element: <AuthRegisterPage/>, path: "verify-register"},
        {element: <LoginPage/>, path: "login"},
        {element: <ResetPasswordPage/>, path: "reset-password"},
        {element: <NewPassWordPage/>, path: "new-password"},
        {element: <VerifyPage/>, path: "verify"},
      ]
    },

    //root
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },

        { path: "conversation", element: <Conversation /> },
        { path: "chats", element: <Chats /> },
// { path: "settings", element: <Settings /> },
        { path: "contact", element: <ContactPage /> },
        
        { path: "404", element: <Page404 /> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const Conversation = Loadable(
  lazy(() => import("../pages/dashboard/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

//sign up
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")))
//auth sign up
const AuthRegisterPage = Loadable(lazy(() => import("../pages/auth/AuthRegister")))
//sign in
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")))
//reset PW
const ResetPasswordPage = Loadable(lazy(() => import("../pages/auth/ResetPassword")))
//new PW
const NewPassWordPage = Loadable(lazy(() => import("../pages/auth/NewPassword")))
//contact
const ContactPage = Loadable(lazy(() => import("../pages/dashboard/Contact")))

const VerifyPage = Loadable(lazy(()=> import("../pages/auth/AuthRegister")))
// const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Setting/Profile"))
);
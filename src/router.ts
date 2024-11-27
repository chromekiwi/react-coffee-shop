import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";

export const url = {
  home: "/",
  account: "/account",
  signIn: "/signin",
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  notFound: "*",
  profile: "/:username",
};

const routes = [
  {
    url: url.home,
    component: Home,
  },
  {
    url: url.account,
    component: null,
    children: [
      {
        url: url.signIn,
        component: SignIn,
      },
      {
        url: url.signUp,
        component: SignUp,
      },
      {
        url: url.forgotPassword,
        component: ForgotPassword,
      },
      {
        url: url.resetPassword,
        component: ResetPassword,
      },
      {
        url: url.profile,
        component: Profile,
      },
    ],
  },
  {
    url: url.notFound,
    component: NotFound,
  },
];

export default routes;

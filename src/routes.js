import Dash from "views/Dash.js";
import Budget from "views/examples/Budget.js";
import ViewBudget from "views/examples/View_budget";
import ReportBudget from "views/examples/Report_budget";
import NewBudget from "views/examples/New_budget";
import Catego from "views/examples/Catego.js";
import Event from "views/examples/Event.js";
import Planned from "views/examples/Planned.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Forgot from "views/examples/Forgot.js";
import Report from "views/examples/Report.js";
import Move from "views/examples/Move.js";
import Account from "views/examples/Acount.js";
import Profile from "views/examples/Profile.js";

var routes = [
  {
    path: "/Account",
    name: "Account",
    icon: "ni ni-app text-blue",
    component: Account,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/dash",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dash,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/catego",
    name: "categories",
    icon: "ni ni-bullet-list-67 text-orange",
    component: Catego,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/budget",
    name: "Budget",
    icon: "ni ni-money-coins text-yellow",
    component: Budget,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/ViewBudget",
    name: "View Budget",
    icon: "ni ni-money-coins text-yellow",
    component: ViewBudget,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/ReportBudget",
    name: "Report Budget",
    icon: "ni ni-books text-info",
    component: ReportBudget,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/NewBudget",
    name: "New Budget",
    icon: "ni ni-money-coins text-yellow",
    component: NewBudget,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/Report",
    name: "Report",
    icon: "ni ni-align-left-2 text-red",
    component: Report,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/event",
    name: "Events",
    icon: "ni ni-time-alarm text-green",
    component: Event,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/planned",
    name: "Planned Payments",
    icon: "fas fa-redo-alt text-blue",
    component: Planned,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/forgot",
    name: "Forgot",
    icon: "ni ni-circle-08 text-pink",
    component: Forgot,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/move",
    name: "Movement",
    icon: "ni ni-circle-08 text-pink",
    component: Move,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-pink",
    component: Profile,
    layout: "/admin",
    sidebar: false,
  },
];
export default routes;

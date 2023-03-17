import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const ManageUser = React.lazy(() => import("./views/dashboard/ManageUser"));
const AdminProfile = React.lazy(() => import("./views/UserProfile"));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/users", name: "Manage User", element: ManageUser },
  { path: "/admin-profile", name: "Admin Profile", element: AdminProfile },
];

export default routes;

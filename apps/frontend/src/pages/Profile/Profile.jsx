import React from "react";

import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return <div className="">{user?.name}</div>;
}

export default Profile;

import React from "react";

import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, loading, refreshSession } = useAuth();

  return (
    <main>
      <section>{user?.name}</section>
    </main>
  );
}

export default Profile;

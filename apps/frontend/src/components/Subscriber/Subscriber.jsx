import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_ONE } from "../../services/Api";

import NavigationContext from "../NavigationContext/NavigationContext";

export default function Subscriber() {
  const { id } = useParams();

  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GET_ONE(id);
        setSubscription(data.data);
        setError(false);
      } catch (err) {
        setSubscription(null);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <NavigationContext />
      <div className="container">{subscription?.fullName}</div>
    </main>
  );
}

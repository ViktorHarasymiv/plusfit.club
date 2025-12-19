import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import ContactsTable from "../../components/ContactsTable/ContactsTable";
import EatBrand from "../../components/EatBrand/EatBrand";
import MapFrame from "../../components/MapFrame/MapFrame";
import Loader from "../../components/ui/Loader/Loader";
import { useMainConfigStore } from "../../store/mainStore";

export default function Contacts() {
  const { config } = useMainConfigStore();

  if (!config) return <Loader />;

  const { address, email, phone, media } = config.data;

  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <ContactsTable data={config.data} />
        </div>
      </section>
      <EatBrand />
      <MapFrame url={address.maps} />
    </main>
  );
}

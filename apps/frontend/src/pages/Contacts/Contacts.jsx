import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import ContactsTable from "../../components/ContactsTable/ContactsTable";
import EatBrand from "../../components/EatBrand/EatBrand";

export default function Contacts() {
  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <ContactsTable />
        </div>
      </section>
      <EatBrand />
    </main>
  );
}

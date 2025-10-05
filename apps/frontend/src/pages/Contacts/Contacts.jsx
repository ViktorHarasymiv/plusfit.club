import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import ContactsTable from "../../components/ContactsTable/ContactsTable";

export default function Contacts() {
  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <ContactsTable />
        </div>
      </section>
    </main>
  );
}

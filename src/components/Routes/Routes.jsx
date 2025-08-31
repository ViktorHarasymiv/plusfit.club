import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home/Home";

function Router() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Components navigation */}

        {/* <Route path="/delivery" element={<Delivery />} /> */}

        {/* Page navigation */}

        {/* <Route
          path="/women"
          element={
            <Women
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        /> */}
      </Routes>
    </>
  );
}

export default Router;

import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home/Home";

import NotFound from "../NotFound/NotFound";

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

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;

import Dashboard from "./Dashboard";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without a data", () => {
  act(() => {
    render(<Dashboard />, container);
  });
  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data").innerHTML).toEqual(
    "No data is available"
  );
  expect(container.querySelector(".dashboard-table")).toBe(null);
});

it("renders with a data with one row", () => {
  const data = {
    test: {
      Total: 8.6,
      eNPS: 75,
      Custom: "",
    },
  };

  act(() => {
    render(<Dashboard data={data} />, container);
  });

  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data")).toBe(null);

  // check value of the header
  // there is always additional first empty header in the table
  expect(container.querySelectorAll(".header-cell").length).toBe(4);
  expect(container.querySelectorAll(".header-cell")[0].innerHTML).toBe("");
  expect(container.querySelectorAll(".header-cell")[1].innerHTML).toBe("Total");
  expect(container.querySelectorAll(".header-cell")[2].innerHTML).toBe("eNPS");
  expect(container.querySelectorAll(".header-cell")[3].innerHTML).toBe(
    "Custom"
  );

  //check values of the row
  expect(container.querySelectorAll(".row-cell").length).toBe(4);
  expect(container.querySelectorAll(".row-cell")[0].innerHTML).toBe("test");
  expect(container.querySelectorAll(".row-cell")[1].innerHTML).toBe("8.6");
  expect(container.querySelectorAll(".row-cell")[2].innerHTML).toBe("75");
  expect(container.querySelectorAll(".row-cell")[3].innerHTML).toBe("?");
});

it("renders with a data with three rows", () => {
  const data = {
    "test 1": {
      Total: 8.6,
      Participation: 8.3,
    },
    "test 2": {},
    "test 3": {
      Autonomy: 8.6,
      Meaningfulness: 7.467,
      Total: 2.4,
    },
  };

  act(() => {
    render(<Dashboard data={data} />, container);
  });

  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data")).toBe(null);

  // check value of the header
  // there is always additional first empty header in the table
  expect(container.querySelectorAll(".header-cell").length).toBe(5);
  expect(container.querySelectorAll(".header-cell")[0].innerHTML).toBe("");
  expect(container.querySelectorAll(".header-cell")[1].innerHTML).toBe("Total");
  expect(container.querySelectorAll(".header-cell")[2].innerHTML).toBe(
    "Participation"
  );
  expect(container.querySelectorAll(".header-cell")[3].innerHTML).toBe(
    "Autonomy"
  );
  expect(container.querySelectorAll(".header-cell")[4].innerHTML).toBe(
    "Meaningfulness"
  );

  //check number of rows
  expect(container.querySelectorAll(".table-row").length).toBe(3);

  //check values of the row
  expect(container.querySelectorAll(".row-cell").length).toBe(15);
  expect(container.querySelectorAll(".row-cell")[0].innerHTML).toBe("test 1");
  expect(container.querySelectorAll(".row-cell")[1].innerHTML).toBe("8.6");
  expect(container.querySelectorAll(".row-cell")[2].innerHTML).toBe("8.3");
  expect(container.querySelectorAll(".row-cell")[3].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[4].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[5].innerHTML).toBe("test 2");
  expect(container.querySelectorAll(".row-cell")[6].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[7].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[8].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[9].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[10].innerHTML).toBe("test 3");
  expect(container.querySelectorAll(".row-cell")[11].innerHTML).toBe("2.4");
  expect(container.querySelectorAll(".row-cell")[12].innerHTML).toBe("?");
  expect(container.querySelectorAll(".row-cell")[13].innerHTML).toBe("8.6");
  expect(container.querySelectorAll(".row-cell")[14].innerHTML).toBe("7.5");
});

it("renders with correct colors of cells", () => {
  const data = {
    "test": {
      "Total": 1.2,
      "eNPS": 3,
      "Custom": "",
      "Leadership": 4,
      "Job satisfaction": 5.4,
      "Meaningfulness": 6,
      "Autonomy": 7.3,
      "Work situation": 8,
      "Dedication": 10.0,
      "Participation": "not available"
    },
  };

  act(() => {
    render(<Dashboard data={data} />, container);
  });

  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data")).toBe(null);

  console.log(container.querySelectorAll(".green").length);
  console.log(container.querySelectorAll(".green")[0].innerHTML)

  //check colors and length of each type of the cell
  expect(container.querySelectorAll(".grey").length).toBe(2);
  expect(container.querySelectorAll(".grey")[0].innerHTML).toBe("?");
  expect(container.querySelectorAll(".grey")[1].innerHTML).toBe("?");
  expect(container.querySelectorAll(".red").length).toBe(1);
  expect(container.querySelectorAll(".red")[0].innerHTML).toBe("1.2");
  expect(container.querySelectorAll(".orange").length).toBe(2);
  expect(container.querySelectorAll(".orange")[0].innerHTML).toBe("3");
  expect(container.querySelectorAll(".orange")[1].innerHTML).toBe("4");
  expect(container.querySelectorAll(".yellow").length).toBe(2);
  expect(container.querySelectorAll(".yellow")[0].innerHTML).toBe("5.4");
  expect(container.querySelectorAll(".yellow")[1].innerHTML).toBe("6");
  expect(container.querySelectorAll(".light-green").length).toBe(2);
  expect(container.querySelectorAll(".light-green")[0].innerHTML).toBe("7.3");
  expect(container.querySelectorAll(".light-green")[1].innerHTML).toBe("8");
  expect(container.querySelectorAll(".green").length).toBe(1);
  expect(container.querySelectorAll(".green")[0].innerHTML).toBe("10");
});

it("renders without rows", () => {
  const data = {
    test: {
    },
  };

  act(() => {
    render(<Dashboard data={data}/>, container);
  });
  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data").innerHTML).toEqual(
    "No data is available"
  );
  expect(container.querySelector(".dashboard-table")).toBe(null);
});

it("renders without empty data", () => {
  const data = {};
  act(() => {
    render(<Dashboard data={data}/>, container);
  });
  expect(container.querySelector(".header").innerHTML).toEqual("Analysis");
  expect(container.querySelector(".no-data").innerHTML).toEqual(
    "No data is available"
  );
  expect(container.querySelector(".dashboard-table")).toBe(null);
});

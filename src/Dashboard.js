import "./Dashboard.css";

function Dashboard({ data }) {
  const rows = [];
  const headers = [];
  const header = "Analysis";
  const noData = "No data is available";

  //sort data for UI representation
  function dataSorting() {
    // collect all unique prop values
    if (!data || data === "") {
      return;
    }

    for (var element in data) {
      if (data.hasOwnProperty(element)) {
        for (var prop in data[element]) {
          !headers.includes(prop) && headers.push(prop);
        }
      }
    }

    // form rows of dashboard
    for (var group in data) {
      var row = [];
      if (data.hasOwnProperty(group)) {
        row.push(group);
        for (let i = 0; i < headers.length; i++) {
          //check if there is a value or the value is numeric
          if (
            !data[group].hasOwnProperty(headers[i]) ||
            !IsNumeric(data[group][headers[i]])
          ) {
            row.push("");
          } else {
            var value = round(data[group][headers[i]], 1);
            row.push(value);
          }
        }
      }
      rows.push(row);
    }
  }

  dataSorting();

  // check if value is numeric
  function IsNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return RE.test(input);
  }

  // round value to set number of decimal places
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  return (
    <div className="dashboard">
      <div className="header">{header}</div>
      {headers.length > 0 && rows.length > 0 && (
        <div className="dashboard-table">
          <div className="table-header">
            <div className="header-cell" key="empty"></div>
            {headers.map((header, index) => {
              return (
                <div className="header-cell" key={"header-cell-" + index}>
                  {header}
                </div>
              );
            })}
          </div>
          <div className="table-body">
            {rows.map((row, index) => {
              return (
                <div className="table-row" key={"table-row-" + index}>
                  {row.map((value, index) => {
                    return (
                      <div
                        className={
                          "row-cell " +
                          (value === ""
                            ? "grey"
                            : value < 2
                            ? "red"
                            : value <= 4
                            ? "orange"
                            : value <= 6
                            ? "yellow"
                            : value <= 8
                            ? "light-green"
                            : value <= 100
                            ? "green"
                            : "")
                        }
                        key={"row-cell-" + index}
                      >
                        {value ? value : "?"}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {(headers.length === 0 || rows.length === 0) && (
        <div className="no-data">{noData}</div>
      )}
    </div>
  );
}

export default Dashboard;

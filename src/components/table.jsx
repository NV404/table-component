import { useState, useRef } from "react";

export default function Table({ header = [], rows = [] }) {
  const clonedArray = [];
  for (let i = 0; i < rows.length; i++) {
    clonedArray.push(rows[i]);
  }

  const [mRows, setRows] = useState(clonedArray);
  const [columnWidths, setColumnWidths] = useState(header.map(() => 150));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSort, setSelectedSort] = useState(0);
  const sortState = ["default", "a-z", "z-a"];
  const resizingColumn = useRef(null);

  const changeSort = (index) => {
    setSelectedSort(index);

    if (index == 0) {
      console.log(clonedArray, "defaultValue");
      setRows(clonedArray);
    }

    if (index == 1) {
      const sortedArray = mRows.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setRows(sortedArray);
    }

    if (index == 2) {
      const sortedArray = mRows.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      setRows(sortedArray);
    }
  };

  const handleMouseDown = (index, event) => {
    resizingColumn.current = {
      index,
      startX: event.clientX,
      startWidth: columnWidths[index],
    };
  };

  const handleMouseDownRow = (index, event) => {
    setSelectedIndex(index);
  };

  const handleMouseMove = (event) => {
    if (!resizingColumn.current) return;

    const { index, startX, startWidth } = resizingColumn.current;
    const deltaX = event.clientX - startX;
    const newWidth = Math.max(startWidth + deltaX, 50);

    setColumnWidths((prevWidths) =>
      prevWidths.map((width, i) => (i === index ? newWidth : width))
    );
  };

  const handleMouseUp = () => {
    resizingColumn.current = null;
  };

  const handleMouseUpRow = (rowIndex, e) => {
    const newState = mRows.filter((item, index) => index != selectedIndex);
    newState.splice(rowIndex, 0, ...[mRows[selectedIndex]]);
    setRows(newState);

    // moveRow.current = null
    setSelectedIndex(null);
  };

  return (
    <div
      className="table-c"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <table style={{ width: "500px" }}>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={col.key} style={{ width: `${columnWidths[index]}px` }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <span>{col.label}</span>
                    {index == 0 ? (
                      <div
                        onClick={() =>
                          changeSort(selectedSort == 2 ? 0 : selectedSort + 1)
                        }
                      >
                        {sortState[selectedSort]}
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="resize-handle"
                    onMouseDown={(e) => handleMouseDown(index, e)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {mRows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onMouseDown={(e) => handleMouseDownRow(rowIndex, e)}
              onMouseUp={(e) => handleMouseUpRow(rowIndex, e)}
              style={{
                backgroundColor:
                  selectedIndex != null && selectedIndex == rowIndex
                    ? "red"
                    : "",
              }}
            >
              {header.map((col, colIndex) => (
                <td
                  key={col.key}
                  style={{ width: `${columnWidths[colIndex]}px` }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// function Sort(items) {
// const sort = item.f
// }

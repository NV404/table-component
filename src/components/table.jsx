import { useState, useRef } from "react";

export default function Table({ header = [], rows = [] }) {
  const [columnWidths, setColumnWidths] = useState(
    header.map(() => 150)
  );
  const resizingColumn = useRef(null);

  const handleMouseDown = (index, event) => {
    resizingColumn.current = { index, startX: event.clientX, startWidth: columnWidths[index] };
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

  return (
    <div
      className="table-c"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <table>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th
                key={col.key}
                style={{ width: `${columnWidths[index]}px` }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>{col.label}</span>
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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
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

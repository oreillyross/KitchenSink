import React from "react";
import { useTable } from "react-table";

function Mytable(props) {
  const tableInstance = useTable({ data: props.data, columns: props.columns });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <>
      <table {...getTableProps}>
        <thead>
          {headerGroups.map(headerGroup => (<tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
              {column.render('Header')}

            </th>
              ))}
          </tr>))}
        </thead>
        <tbody {...getTableBodyProps()}>
          
          {rows.map(row => {
            prepareRow(row);
            
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default Mytable;

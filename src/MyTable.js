import React from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { useTable, useSortBy } from "react-table";

function Mytable(props) {
  const tableInstance = useTable(
    {
      data: props.data,
      columns: props.columns,
      initialState: { 
       sortBy: [{id: 'created_at', desc: true}],
       
      }
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <>
      <MaUTable {...getTableProps}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <>
                          <ArrowDownwardIcon
                            style={{ fontSize: "10px", float: "right" }}
                          />
                          <SortByAlphaIcon
                            style={{ fontSize: "10px", float: "right" }}
                          />{" "}
                        </>
                      ) : (
                        <>
                          <ArrowUpwardIcon
                            style={{ fontSize: "10px", float: "right" }}
                          />
                          <SortByAlphaIcon
                            style={{ fontSize: "10px", float: "right" }}
                          />{" "}
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </>
  );
}
export default Mytable;

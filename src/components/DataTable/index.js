import React from 'react';
import {
  Paper,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
 } from 'react-md';

function Table(props) {

  const {
    tableHeaderKeys,
    rowRenderer,
    items : rows
  } = props

  const BCP = 'customTable'


  return (
    <>
      <DataTable className={BCP} plain>
        <TableHeader className={`${BCP}_header`}>
          <TableRow className={`${BCP}_row`}>
            { tableHeaderKeys.map((cell) => (
                <TableColumn className={`${BCP}_cell`}>
                  { cell.label }
                </TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        { rows.length !== 0 && (
          <TableBody className={`${BCP}_body`}>
            {rows.map((row, i) => (
              <TableRow key={i} className={`${BCP}_row`}>
                { tableHeaderKeys.map((cell) => (
                    <TableColumn className={`${BCP}_cell`}>
                      {rowRenderer(cell.key, row)}
                    </TableColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </DataTable>
      { rows.length === 0 && (
        <div className="noRecords">
          <h1 className="noRecords_label">
            No Records Found
          </h1>
        </div>
      )}
    </>
  )
}


export default Table


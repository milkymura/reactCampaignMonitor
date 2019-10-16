import React from 'react';
import {
  Paper,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
 } from 'react-md';

function Campaign(props) {
  console.log( 'Campaign' , props)
  return(
    <Paper>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Lorem 1</TableColumn>
            <TableColumn>Lorem 2</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(Array(10)).map((_, i) => (
            <TableRow key={i}>
              <TableColumn> Lorem ipsum dolor sit amet. </TableColumn>
              <TableColumn> Lorem ipsum dolor sit amet. </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
  )
}
export default Campaign

import React from 'react';
import { Paper } from 'react-md';
import { shallowEqual, useSelector } from 'react-redux'
import { convertToMoney } from 'tools/helper'
import Table from 'components/DataTable'
import moment from 'moment'

function Campaign(props) {
  const campaignlist = useSelector(state => state.campaignlist)
  console.log('@@@Campaign === ', campaignlist)


  const tableHeaderKeys = [
    {
      key: "id",
      label: "Id"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "startDate",
      label: "Start Date"
    },
    {
      key: "endDate",
      label: "End Date"
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "budget",
      label: "Budget"
    }
  ]

  const rowRenderer = (col,row) => {

    console.log('@@rowRenderer == ', col,row)

    if (col === 'budget') {
      return convertToMoney(row[col])
    }

    if (col === 'status') {
      const dateNow = moment()
      const { startDate, endDate } = row

      const isActive = dateNow > moment(startDate) && dateNow < moment(endDate)

      if(isActive) {
        return (
          <div className="statusPill statusPill-success">
            active
          </div>
        )
      }

      return (
        <div className="statusPill statusPill-default">
          not active
        </div>
      )

    }

    return row[col]
  }



  return(
    <Paper>
      <Table
        items={campaignlist}
        tableHeaderKeys={tableHeaderKeys}
        rowRenderer={rowRenderer}
      />
    </Paper>
  )
}
export default Campaign

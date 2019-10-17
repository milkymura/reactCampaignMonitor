import React, { useState, useEffect } from 'react';
import { convertToMoney } from 'tools/helper'
import debounce from 'lodash/debounce';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
  TextField,
  DatePicker,
  Button
} from 'react-md';
import Table from 'components/DataTable';
import RowToolbar from 'components/DashboardLayout/RowToolbar';
import { AddCampaignDialog } from 'components/Dialogs'



function renderFilteredListBySearch(list, search) {
  return list.filter((row) => {
    return row.name.toLowerCase().includes(search.toLowerCase())
  })
}

function filterListByDate(list, startDate, endDate) {
  if (startDate && endDate) {
    return list.filter((row) => {
      return (moment(row.startDate) >= moment(startDate) && moment(row.startDate) <= moment(endDate)) &&
        (moment(row.endDate) >= moment(startDate) && moment(row.endDate) <= moment(endDate))
    })
  }

  return list
}

function fitlerList(list, search, { startDate, endDate }) {
  list = renderFilteredListBySearch(list, search)
  list = filterListByDate(list, startDate, endDate)
  return list
}

function Campaign(props) {
  const campaignlist = useSelector(state => state.campaignlist)
  const [tempList, updateTempList] = useState(campaignlist)
  const [isCampaignDialogOpen, handleCampaignDialogOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [startEndDate, setStartEndDate] = useState({ startDate : '', endDate: ''})

  useEffect(() => {}, [ campaignlist ])

  // console.log('Campaign', campaignlist)

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

    if (col === 'budget') {
      return convertToMoney(row[col])
    }

    if (col === 'status') {
      const DATENOW = moment()
      const { startDate, endDate } = row
      const isActive = DATENOW > moment(startDate) && DATENOW < moment(endDate)
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


  const handleSearch = (val) => {
    setSearch(val)
  }

  const handleDateChange = (date, dateKey) => {
    const tempRange = { ...startEndDate }
    tempRange[dateKey] = date
    setStartEndDate(tempRange)
  }

  const toolbarHandlers = {
    onClickNew: () => { 
      handleCampaignDialogOpen(true)
    }
  }

  return(
    <>
      <AddCampaignDialog
        title='Add Campaign'
        visible={isCampaignDialogOpen}
        onHideDialog={() => {handleCampaignDialogOpen(false)}}
      />
      <RowToolbar
        isSticky
        title='Campaigns'
        toolbarHandlers={toolbarHandlers}
      />
      <div className="row">
        <Paper>
          <div className="row row-headerToolbar ">
            <div className="col col-md-6 col-dates col-middle">
              <DatePicker
                portal
                renderNode={document.body}
                id="appointment-date-portrait"
                label="Start Date"
                className="md-cell"
                displayMode="portrait"
                value={startEndDate.startDate}
                onChange={(e) => { handleDateChange(e, 'startDate') }}
              />
              <DatePicker
                portal
                renderNode={document.body}
                id="appointment-date-portrait"
                label="End Date"
                className="md-cell"
                displayMode="portrait"
                value={startEndDate.endDate}
                onChange={(e) => { handleDateChange(e, 'endDate') }}
              />
              <Button
                icon
                children="close"
                className="iBttn iBttn-icon iBttn-primary"
                onClick={() => {setStartEndDate({ startDate : '', endDate: ''})}}
              />
            </div>
            <div className="col col-md-6 col-right col-search">
              <TextField
                id="floating-center-title"
                label="filter name"
                lineDirection="center"
                placeholder="Hello World"
                className="md-cell md-cell--bottom"
                onChange={(val) => { handleSearch(val) } }
              />
            </div>
          </div>
          <Table
            items={fitlerList(campaignlist, search, startEndDate)}
            tableHeaderKeys={tableHeaderKeys}
            rowRenderer={rowRenderer}
          />
        </Paper>
      </div>
    </>
  )
}


export default Campaign

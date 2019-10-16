import React, { useState } from 'react';
import {
  Paper,
  TextField,
  DatePicker 
} from 'react-md';
import { shallowEqual, useSelector } from 'react-redux'
import { convertToMoney } from 'tools/helper'
import Table from 'components/DataTable'
import moment from 'moment'
import debounce from 'lodash/debounce';

function Campaign(props) {
  const DATENOW = moment()
  const campaignlist = useSelector(state => state.campaignlist)
  const [tempList, updateTempList] = useState(campaignlist)
  const [search, updateSearch] = useState('')
  const [startEndDate, updateStartEndDate] = useState({ startDate : '', endDate: ''})


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

  const handleFilter = (filterKey, searchedWord) => {
    let filtered = [...campaignlist]
    updateSearch(searchedWord)

    if(searchedWord) {
      filtered = [...campaignlist].filter((row) => {
        return row[filterKey].toLowerCase().includes(search.toLowerCase())
      })
    }

    updateTempList(filtered)
  }

  const handleSearch = (e) => {
    handleFilter('name', e)
  }

  const handleDateChange = (date, dateKey) => {
    const tempRange = { ...startEndDate }
    tempRange[dateKey] = date
    updateStartEndDate(tempRange)

    if(tempRange.startDate !== '' 
      && tempRange.endDate !== '') {
      const filtered = [...campaignlist].filter((row) => {
        const { startDate, endDate } = row
        return DATENOW > moment(startDate) && DATENOW < moment(endDate)
      })
      updateTempList(filtered)
    }
  }

  return(
    <Paper>
      <div className="row row-headerToolbar">
        <div className="col col-md-6 col-dates">
          <DatePicker
            portal
            renderNode={document.body}
            id="appointment-date-portrait"
            label="Start Date"
            className="md-cell"
            displayMode="portrait"
            onChange={(e) => { handleDateChange(e, 'startDate') }}
          />
          <DatePicker
            portal
            renderNode={document.body}
            id="appointment-date-portrait"
            label="End Date"
            className="md-cell"
            displayMode="portrait"
            onChange={(e) => { handleDateChange(e, 'endDate') }}
          />
        </div>
        <div className="col col-md-6 col-right col-search">
          <TextField
            id="floating-center-title"
            label="filter name"
            lineDirection="center"
            placeholder="Hello World"
            className="md-cell md-cell--bottom"
            onChange={(e) => { handleSearch(e)} }
          />
        </div>
      </div>
      <Table
        items={tempList}
        tableHeaderKeys={tableHeaderKeys}
        rowRenderer={rowRenderer}
      />
    </Paper>
  )
}


export default Campaign

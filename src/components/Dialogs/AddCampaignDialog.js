import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';

import { Paper, Button, TextField, DatePicker } from 'react-md';
import withDialog from 'HOCS/withDialog';

import { ADD_CAMPAIGN } from 'tools/redux/reducers'


function AddCampaignDialog(props) {
  console.log('@@AddCampaignDialog [props] == ', props)

  const dispatch = useDispatch();
  const campaignlistLength = useSelector(state => state.campaignlist.length)

  const [ fields , updateFields ] = useState({})


  const handleSave = () => {
    dispatch({ 
      type: 'ADD_CAMPAIGN',
      payload: {
        id: campaignlistLength + 1,
        ...fields
      }
    });
    props.onHideDialog()
  }


  const handleField = (val, key) => {
    const tempFields = {...fields}
    // console.log('handleField E', e)
    // console.log('handleField VAL', val)
    tempFields[key] = val
    updateFields(tempFields)
  }

  return (
    <>
      <TextField
        id="name"
        label="filter name"
        lineDirection="center"
        className="cField"
        onChange={(val) => { handleField(val,'name')}}
      />
      <TextField
        id="budget"
        label="Budget"
        lineDirection="center"
        className="cField"
        onChange={(val) => { handleField(val,'budget')}}
      />
      <div className="row">
        <div className="col col-md-6">
          <DatePicker
            inline
            id="startDate"
            label="Select a Start Date"
            displayMode="portrait"
            fullWidth={false}
            className="cField cField-date"
            onChange={(val) => { handleField(val,'startDate')}}
          />
        </div>
        <div className="col col-md-6">
          <DatePicker
            inline
            id="endDate"
            label="Select a End Date"
            displayMode="portrait"
            fullWidth={false}
            className="cField cField-date"
            onChange={(val) => { handleField(val,'endDate')}}
          />
        </div>
      </div>

      <div className="row">
        <div className="col col-right">
          <Button
            flat
            children="Save"
            iconChildren="check"
            className="iBttn iBttn-primary"
            onClick={handleSave}
          />
        </div>
      </div>
    </>
  );
}


export default withDialog(AddCampaignDialog);


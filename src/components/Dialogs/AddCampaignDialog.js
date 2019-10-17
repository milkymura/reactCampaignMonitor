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

  const defaultFields = {
    name: '',
    budget: '',
    startDate: '',
    endDate: ''
  }

  const [ errorFields , updateErrors ] = useState(defaultFields)
  const [ fields , updateFields ] = useState(defaultFields)


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
    const tempErrorFields = {...errorFields}

    // console.log('handleField E', e)
    // console.log('handleField VAL', val)
    if (val !== '') {
      if (key === 'budget') {
        tempFields.budget = !isNaN(val) && val
      } else {
        tempFields[key] = val
      }
      delete tempErrorFields[key]
    } else {
      tempErrorFields[key] = `${key} is required`
    }

    updateFields(tempFields)
    updateErrors(tempErrorFields)
  }

  return (
    <>
      <TextField
        required
        id="name"
        label="Campaign Name"
        lineDirection="center"
        className="cField"
        onChange={(val) => { handleField(val,'name')}}
        errorText={errorFields.name}
      />
      <TextField
        required
        id="budget"
        label="Budget"
        lineDirection="center"
        className="cField"
        value={fields.budget ? fields.budget : ''}
        onChange={(val) => { handleField(val,'budget')}}
        errorText={errorFields.budget}
      />
      <div className="row">
        <div className="col col-md-6">
          <DatePicker
            required
            portal
            renderNode={document.body}
            id="startDate"
            label="Select a Start Date"
            displayMode="portrait"
            fullWidth={false}
            className="cField cField-date"
            onChange={(val) => { handleField(val,'startDate')}}
            errorText={errorFields.startDate}
          />
        </div>
        <div className="col col-md-6">
          <DatePicker
            required
            portal
            renderNode={document.body}
            id="endDate"
            label="Select a End Date"
            displayMode="portrait"
            fullWidth={false}
            className="cField cField-date"
            onChange={(val) => { handleField(val,'endDate')}}
            errorText={errorFields.endDate}
          />
        </div>
      </div>
      <div className="row">
        <div className="col col-right">
          <Button
            flat
            disabled={Object.keys(errorFields).length !== 0}
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


/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';



const AutoCompleteComp = ({label,value_list, label_field, value_field, value, onComboValueChange, required}) => {
    const classes = useStyles();
    let option_list = [];
    let selected_value = {};
    value_list.map(v => {
        const optn = {value: v[value_field], label: v[label_field]};
        option_list.push(optn);
        if(value === v[value_field]){
            selected_value = optn;
        }
        });

    return (
        <div className={classes.field}>
            <Autocomplete
            size="small"
            style={{ width: '100%' }}
            options={option_list}
            classes={{ option: classes.option}}
            autoHighlight
            getOptionLabel={(option) => option.label ? option.label : '' }
            value={selected_value}
            onChange={(event, newValue) => {
                    let v = (newValue && newValue.value)? newValue.value: '';
                    onComboValueChange(v);
                }
            }

            renderInput={(params) => (
                <TextField
                {...params}
                label={label}
                required={required}
                variant="outlined"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                size="small"
                />
            )}
            />
        </div>
    );
}

export default AutoCompleteComp;

const useStyles = makeStyles((theme)=>({
    field:{marginBottom: theme.spacing(2)},
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  }));

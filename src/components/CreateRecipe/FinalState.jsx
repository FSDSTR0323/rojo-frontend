import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHaccp } from '../../hooks/useHaccp';

export default function FinalState() {
  const { valuePrepreparation, valuePreparation, prePreparation } = useHaccp();
  const previousValues = [valuePrepreparation, valuePreparation];

  function finalStateFilter(previousValues, prePreparation) {
    const filtredNames = prePreparation
      .map((haccp) => haccp.name)
      .filter((element, index) => {
        console.log('log de element', element);
        return prePreparation.indexOf(element) === index;
      })

      .filter((name) => {
        console.log('name', name);
        return !previousValues.includes(name);
      });
    return filtredNames;
  }

  console.log('use value final state', previousValues);

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Final state</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {finalStateFilter(previousValues, prePreparation).map(
          (haccp, index) => (
            <FormControlLabel
              value={haccp}
              key={index}
              control={<Radio />}
              label={haccp}
            />
          )
        )}
      </RadioGroup>
    </FormControl>
  );
}

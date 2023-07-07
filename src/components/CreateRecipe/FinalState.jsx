import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHaccp } from '../../hooks/useHaccp';

export default function FinalState() {
  const { valuePrepreparation, valuePreparation, prePreparation, action } =
    useHaccp();
  const [previousValues, setPreviousValues] = useState([]);
  const [finalState, setFinalState] = useState([]);

  useEffect(() => {
    setPreviousValues([valuePreparation, valuePrepreparation]);
    setFinalState(finalStateFilter());
  }, [valuePrepreparation, valuePreparation, action]);

  function finalStateFilter() {
    const filtredNames = prePreparation
      .map((haccp) => haccp.name)
      .filter((element, index, self) => {
        console.log('log de element', element);
        return self.indexOf(element) === index;
      })
      .filter((name) => {
        console.log('name', name);
        return !previousValues.includes(name);
      });
    return filtredNames;
  }

  console.log('use value final state', previousValues);
  console.log('Final State', finalState);

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Final state</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {finalState.map((haccp, index) => (
          <FormControlLabel
            value={haccp}
            key={index}
            control={<Radio />}
            label={haccp}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHaccp } from '../../hooks/useHaccp';

const haccp = [
  'Defrosting',
  'Chilled storage',
  'Frozen storage',
  'Dry goods storage',
  'Preparation',
  'Cooking',
];

export default function FinalState() {
  const {
    valuePrepreparation,
    valuePreparation,
    prePreparation,
    action,
    setFinalization,
  } = useHaccp();
  const [previousValues] = useState(haccp);
  const [finalState, setFinalState] = useState([]);

  useEffect(() => {
    setFinalState(finalStateFilter());
  }, [valuePrepreparation, valuePreparation, action]);

  function finalStateFilter() {
    const filtredNames = prePreparation
      .filter((haccp) => haccp.step === 'Finalization')
      .map((haccp) => {
        console.log('log de haccp', haccp);
        return haccp.action[action].map((option) => option);
      })
      .flat()
      .filter((element, index, arr) => arr.indexOf(element) === index);
    // .map((element) => {
    //   return element
    //     .split(' ')
    //     .map((word) => word[0].toUpperCase() + word.slice(1))
    //     .join(' ');
    // });
    console.log('Log de filtred names:', filtredNames);
    return filtredNames;
  }

  const handleState = (e) => {
    setFinalization(e.target.value);
  };

  console.log('use value final state', previousValues);
  console.log('Final State', finalState);

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Final state</FormLabel>
      <RadioGroup
        onChange={handleState}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {finalState?.map((haccp, index) => (
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

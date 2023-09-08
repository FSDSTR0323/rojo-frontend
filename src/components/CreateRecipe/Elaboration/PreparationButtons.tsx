import { useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useHaccp } from '../../../hooks/useHaccp'
import Checkbox from '@mui/material/Checkbox'

export default function PreparationButtons () {
  const {
    elaboration,
    setElaboration,
    setValuePreparation,
    valuePreparation,
    prePreparation
  } = useHaccp()

  const handleChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setElaboration([...elaboration, value])
      setValuePreparation([...valuePreparation, value])
    } else {
      setElaboration(elaboration.filter((item) => item !== value))
      setValuePreparation(valuePreparation.filter((item) => item !== value))
    }
  }

  useEffect(() => {}, [prePreparation])

  const hasCooking = prePreparation.some((haccp) => haccp.name === 'Cooking')
  const hasPreparation = prePreparation.some(
    (haccp) => haccp.name === 'Preparation'
  )

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose the preparation
      </FormLabel>
      {hasCooking && (
        <FormControlLabel
          onChange={handleChange}
          control={<Checkbox />}
          label="Cook"
          value={'Cooking'}
        />
      )}
      {hasPreparation && (
        <FormControlLabel
          onChange={handleChange}
          control={<Checkbox />}
          label="Preparation"
          value={'Preparation'}
        />
      )}
    </FormControl>
  )
}

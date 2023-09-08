import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useHaccp } from '../../../hooks/useHaccp'
import { Typography } from '@mui/material'

export default function BasicSelect () {
  const { action, setAction } = useHaccp()
  const handleChange = async (event) => {
    setAction(event.target.value)
  }

  return (
    <Box
      sx={{
        color: 'white',
        fontSize: '20px'
      }}
    >
      <Typography>
        <h3>Choose the actions</h3>
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">What you'll do?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="What you'll do?"
          onChange={handleChange}
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value={'use'}>Use</MenuItem>
          <MenuItem value={'keep'}>Keep</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

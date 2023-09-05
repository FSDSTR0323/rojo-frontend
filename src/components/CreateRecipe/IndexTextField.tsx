import { Grid } from '@mui/material'
import Elabroration from './Elaboration/Elaboration'
import Finishing from './FinalState/Finishing'
import PrePreparation from './InitialState/PrePreparation'

const IndexTextField = () => {
  return (
    <Grid item xs={7} paddingLeft="30px !important">
      <PrePreparation />
      <Elabroration />
      <Finishing />
    </Grid>
  )
}

export default IndexTextField

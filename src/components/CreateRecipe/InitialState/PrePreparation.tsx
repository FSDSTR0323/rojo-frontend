import Box from '@mui/material/Box'
import { useHaccp } from '../../../hooks/useHaccp'
import CardRecipe from '../CardRecipe'
import { Typography } from '@mui/material'
import { useEffect } from 'react'

export default function PrePreparation () {
  const { prePreparation, valuePrepreparation } = useHaccp()

  useEffect(() => {}, [valuePrepreparation, prePreparation])

  return (
    <Box>
      <Typography sx={{ color: '#277527' }}>
        <h3>
          <strong>Pre-Preparation</strong>
        </h3>
      </Typography>
      <hr />

      {prePreparation.length > 0 ? (
        <>
          {prePreparation
            .filter((haccp) => valuePrepreparation.includes(haccp.name))
            .map((haccp, index) => {
              return <CardRecipe key={index} haccp={haccp} />
            })}
        </>
      ) : null}
    </Box>
  )
}

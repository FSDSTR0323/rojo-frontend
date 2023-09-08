import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import axios from 'axios'
import { CardRecipe } from '../Recipe/CardRecipe'
import { RECIPES } from '../../config/routes'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

type haccpInfo = {
  _id: string
  step: string
  name: string
  ingredientsStatus: string[]
  control: string
  hazzard: string
  procedure: string
  frequency: string[]
  limits: string[]
  correctiveAction: string[]
}

type CardRecipe = {
  haccp: haccpInfo
  radioValidate: boolean
}

type validateTypeItem = {
  recipe: string
  name: string
  steps: StepType[]
}

type ApiResponse = {
  formData: validateTypeItem
  token: string
}

type StepType = {
  haccp: string
  valid: string
  correctiveAction?: string
  comment?: string
}

export const ValidateForm: React.FC<{
  selectedValidation: haccpInfo[]
  recipeId: string
  recipeName: string
  isValidationMode: boolean
  disableValidationMode
}> = ({
  selectedValidation,
  recipeId,
  recipeName,
  isValidationMode,
  disableValidationMode
}) => {
  const { user } = useUser()
  const params = useParams()

  const [ValidateData, setValidateData] =
    useState<haccpInfo[]>(selectedValidation)

  const navigate = useNavigate()

  useEffect(() => {
    setValidateData(selectedValidation)
  }, [selectedValidation])

  const [recipe, setRecipe] = useState<validateTypeItem>({
    recipe: recipeId,
    name: recipeName,
    steps: []
  })
  useEffect(() => {}, [recipe])

  const [data, setData] = useState({})
  useEffect(() => {
    let newSteps = [...recipe.steps]
    const newStep = data

    if (recipe.steps.length != 0) {
      let exist = 0
      for (let i = 0; i < recipe.steps.length; i++) {
        if (recipe.steps[i].haccp === newStep.haccp) {
          exist = 1
          if (newStep.valid === 'true') {
            newSteps[i].valid = 'true'
            newSteps[i].correctiveAction = ''
            newSteps[i].comment = ''
          } else {
            newSteps[i].valid = 'false'
            if (newStep.correctiveAction != undefined) {
              newSteps[i].correctiveAction = newStep.correctiveAction
            }
            if (newStep.comment != undefined) {
              newSteps[i].comment = newStep.comment
            }
          }
        }
      }
      if (exist === 0) {
        newSteps = [...newSteps, newStep]
      }
    } else {
      newSteps = [...newSteps, newStep]
    }

    const newRecipeData = {
      ...recipe,
      recipe: recipeId,
      name: recipeName,
      steps: [...newSteps]
    }

    if (newStep.haccp !== undefined) {
      setRecipe(newRecipeData)
    }
  }, [data])

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name_id = e.target.name.split('_')
    const id = name_id[1]
    const name = name_id[0]
    const value = e.target.value
    setData(() => ({ [name]: value, haccp: id }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      const formData = recipe
      const token = user.token

      const response = await axios.post<ApiResponse>(
        baseUrl + 'validation',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(RECIPES)
    } catch (error) {
      console.log('Axios error handleSubmid validateForm', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography sx={{ mt: 2 }}>Pre-preparation</Typography>
      <hr />
      {ValidateData?.filter((haccp) => haccp.step === 'Pre-preparation').map(
        (haccp, index) => (
          <CardRecipe
            key={index}
            haccp={haccp}
            isValidationMode={isValidationMode}
            handleChangeData={handleChangeData}
          />
        )
      )}

      <Typography sx={{ mt: 2 }}>Preparation</Typography>
      <hr />
      {ValidateData?.filter((item) => item.step == 'Preparation').map(
        (haccp, index) => (
          <CardRecipe
            key={index}
            haccp={haccp}
            isValidationMode={isValidationMode}
            handleChangeData={handleChangeData}
          />
        )
      )}

      <Typography sx={{ mt: 2 }}>Finalitzation</Typography>
      <hr />
      {ValidateData?.filter((item) => item.step == 'Finalization').map(
        (haccp, index) => (
          <CardRecipe
            key={index}
            haccp={haccp}
            isValidationMode={isValidationMode}
            handleChangeData={handleChangeData}
          />
        )
      )}
      {isValidationMode && (
        <>
          <Button
            sx={{
              mt: 1.5,
              mb: 1,
              width: '100%',
              backgroundColor: '#DC143C',
              '&:hover': {
                backgroundColor: '#dc143c96'
              }
            }}
            variant="contained"
            name="cancel"
            onClick={disableValidationMode}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              mt: 1.5,
              mb: 3,
              width: '100%',
              backgroundColor: '#277c27fb',
              '&:hover': {
                backgroundColor: '#277c27cf'
              }
            }}
            variant="contained"
          >
            Validate Recipe
          </Button>
        </>
      )}
    </Box>
  )
}

import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'

import { Link } from 'react-router-dom'
import { ADDRECIPE, PERMISSIONS } from '../../config/routes'

import axios from 'axios'

import { useUser } from '../../hooks/useUser'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL

interface RecipeListType {
  _id: string
  name: string
  imageUrl: string
}

export const RecipeList = () => {
  const { user } = useUser()
  const [RecipeList, setRecipeList] = useState([])

  const permissions = user.info?.permissions

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(baseUrl + 'recipe', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setRecipeList(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [user])

  return (
    <ImageList
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      {permissions.includes(PERMISSIONS.RECIPE_CREATE) && (
        <ImageListItem
          sx={{
            width: '15%',
            mb: 1.5
          }}
          key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format"
        >
          <Link to={ADDRECIPE}>
            <Box
              component="img"
              src={
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format'
              }
              srcSet={
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x'
              }
              alt="Create New Recipe"
              loading="lazy"
              sx={{
                width: '100%'
              }}
            />
            <ImageListItemBar
              title="Create New Recipe"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={'info about Add Recipe'}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </Link>
        </ImageListItem>
      )}

      {RecipeList.map((item: RecipeListType) => (
        <ImageListItem
          sx={{
            width: '15%',
            mb: 1.5
          }}
          key={item._id}
        >
          <Link to={`/recipe/${item._id}`}>
            <Box
              component="img"
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              sx={{
                width: '100%'
              }}
            />
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

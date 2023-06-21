import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
/*
const useStyles = makeStyles({
  a: {
    display: 'block',
    height: '100%',
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
});
*/
export const RecipeList = () => {
  //const classes = useStyles();

  //const Recipes = await axios.get();

  return (
      <ImageList sx={{ 
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: 'space-between'
          }}
          >
          <ImageListItem 
            sx={{ 
              width: '15%',
              mb: 1.5,
              cursor: 'pointer'
            }}
            key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format"
            >
              <img 
                src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format`}
                srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="Add Recipe"
                loading="lazy"
              />
              
              <ImageListItemBar
                  title="Add Recipe"
                  actionIcon={
                      <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about Add Recipe`}
                      >
                          <InfoIcon />
                      </IconButton>
                  }
              />
          </ImageListItem>
          
          {Recipes.map((item) => (
              <ImageListItem 
                sx={{ 
                  width: '15%',
                  mb: 1.5,
                }}
                key={item.id}
                >
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    />
                  <ImageListItemBar
                      title={item.title}
                      actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                            >
                            <InfoIcon />
                          </IconButton>
                      }
                  />
              </ImageListItem>
          ))}
      </ImageList>
  );
}

const Recipes = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    id: 9,
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    id: 10,
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    id: 11,
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    id: 12,
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

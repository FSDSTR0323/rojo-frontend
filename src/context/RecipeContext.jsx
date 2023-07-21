import React, { createContext, useEffect, useState } from 'react';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [action, setAction] = React.useState('use');
  const [elaboration, setElaboration] = React.useState([]);
  const [prePreparation, setPrePreparation] = useState([]);
  const [preparation, setPreparation] = useState([]);
  const [finalization, setFinalization] = useState([]);
  const [valuePrepreparation, setValuePrepreparation] = useState([]);
  const [valuePreparation, setValuePreparation] = useState([]);
  const [recipeHaccp, setRecipeHaccp] = useState([]);
  const [picture, setPicture] = useState('');
  const [initialStateName, setInitialStateName] = React.useState([]);
  const [recipeData, setRecipeData] = useState({
    name: '',
    haccps: [],
    action: {},
    imageUrl: '',
  });
  return (
    <RecipeContext.Provider
      value={{
        prePreparation,
        setPrePreparation,
        preparation,
        setPreparation,
        finalization,
        setFinalization,
        action,
        setAction,
        elaboration,
        setElaboration,
        valuePrepreparation,
        setValuePrepreparation,
        valuePreparation,
        setValuePreparation,
        recipeHaccp,
        setRecipeHaccp,
        recipeData,
        setRecipeData,
        picture,
        setPicture,
        initialStateName,
        setInitialStateName,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;

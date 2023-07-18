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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;

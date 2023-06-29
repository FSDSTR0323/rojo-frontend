import React, { createContext, useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const { user } = useUser();
  const [recipeContext, setrecipeContext] = useState({
    defrost: '',
    fresh: '',
    coldStorage: '',
    dryStrorage: '',
    reahting: '',
    cooling: '',
    freeze: '',
    cook: '',
    coldDisplay: '',
    hotHolding: '',
    addPicture: '',
  });
  const [prePreparation, setPrePreparation] = useState([]);
  const [Preparation, setPreparation] = useState([]);
  const [finalitzation, setFinalitzation] = useState([]);

  return (
    <RecipeContext.Provider
      value={{
        prePreparation,
        setPrePreparation,
        Preparation,
        setPreparation,
        finalitzation,
        setFinalitzation,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;

import React, { createContext, useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [action, setAction] = React.useState('');
  const [elaboration, setElaboration] = React.useState();
  // const [recipeContext, setrecipeContext] = useState({
  //   defrost: '',
  //   fresh: '',
  //   coldStorage: '',
  //   dryStrorage: '',
  //   reahting: '',
  //   cooling: '',
  //   freeze: '',
  //   cook: '',
  //   coldDisplay: '',
  //   hotHolding: '',
  //   addPicture: '',
  // });
  const [prePreparation, setPrePreparation] = useState([]);
  const [preparation, setPreparation] = useState([]);
  const [finalitzation, setFinalitzation] = useState([]);
  const [valuePrepreparation, setValuePrepreparation] = useState('');
  const [valuePreparation, setValuePreparation] = useState('');
  return (
    <RecipeContext.Provider
      value={{
        prePreparation,
        setPrePreparation,
        preparation,
        setPreparation,
        finalitzation,
        setFinalitzation,
        action,
        setAction,
        elaboration,
        setElaboration,
        valuePrepreparation,
        setValuePrepreparation,
        valuePreparation,
        setValuePreparation,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;

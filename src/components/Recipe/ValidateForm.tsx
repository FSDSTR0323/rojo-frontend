import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useUser } from '../../hooks/useUser';
import axios from "axios";
import { CardRecipe } from '../Recipe/CardRecipe'


type haccpInfo = {
    _id: string,
    step: string,
    name: string,
    ingredientsStatus: string[],
    control: string,
    hazzard: string,
    procedure: string,
    frequency: string[],
    limits: string[],
    correctiveAction: string[],
}

type CardRecipe = {
    haccp: haccpInfo,
    radioValidate: boolean
};

type validateTypeItem = {
    recipe: String,
    name: String,
    steps: StepType[]
}

type ApiResponse = {
    formData: validateTypeItem,
    token: String
}

type StepType = {
    haccp: String;
    valid: String;
    correctiveAction?: String;
    comment?: String;
}

// type ValidateType = [
//     validateTypeItem
// ];

// type ValidationFormProps = {
//     onValidateAdd: (Recipe: any) => void;
// };

export const ValidateForm: React.FC<{selectedValidation: haccpInfo[], recipeId: string, recipeName: String, isValidationMode:boolean, disableValidationMode}> = ({selectedValidation, recipeId, recipeName, isValidationMode, disableValidationMode}) => {

    const { user } = useUser();
    const params = useParams();

    // const [stepData, setStepData] = React.useState<StepType>({
    //     haccp: '',
    //     valid: true,
    //     correctiveAction: '',
    //     comment: '',
    // });

    const [ValidateData, setValidateData] = useState<haccpInfo[]>(selectedValidation);

    useEffect( () => {
        setValidateData(selectedValidation)
    }, [selectedValidation])

    const [recipe, setRecipe] = useState<validateTypeItem>({
        recipe: recipeId,
        name: recipeName,
        steps: []
    });
    useEffect(() => {
        console.log("useEffect set recipe", recipe)
    },[recipe])

    const [data, setData] = useState({});
    useEffect(() => {
        var newSteps = [...recipe.steps]
        var newStep = data
 
        if(recipe.steps.length != 0) {
            var exist = 0;
            for(var i = 0; i < recipe.steps.length; i++){                
                if(recipe.steps[i].haccp === newStep.haccp) {
                    exist = 1;
                    if(newStep.valid === 'true') {
                        //console.log("= true")
                        newSteps[i].valid = 'true'
                        newSteps[i].correctiveAction = ''
                        newSteps[i].comment = ''
                    } else {
                        //console.log("= false")
                        newSteps[i].valid = 'false'
                        if(newStep.correctiveAction != undefined) { newSteps[i].correctiveAction = newStep.correctiveAction }
                        if(newStep.comment != undefined) { newSteps[i].comment = newStep.comment }
                    }
                }
            }
            if(exist === 0) {
                newSteps = [...newSteps, newStep]
            }
        } else {
            newSteps = [...newSteps, newStep]
        }

        const newRecipeData = {
            ...recipe,
            recipe: recipeId,
            name: recipeName,
            steps: [
                ...newSteps
            ]
        }

        if(newStep.haccp !== undefined) {
            setRecipe(newRecipeData)
        }
    }, [data])

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name_id = e.target.name.split('_');
        const id = name_id[1];
        const name = name_id[0];
        const value = e.target.value;
        setData(() => ({ [name]: value, haccp: id }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const formData = recipe

            console.log(formData)

            const token = user.token

            // const response: ApiResponse = await axios.post(
            //     `http://localhost:3000/validation/`, {
            //         formData,
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );

            console.log("token", token)

            const response = await axios.post<ApiResponse>(
                'http://localhost:3000/validation/',
                { ...formData },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );


            // let response = await axios.post<ApiResponse>(
            //     'http://localhost:3000/validation/',{
            //         formData, 
            //         {
            //         headers: {
            //            Authorization: `Bearer ${token}`,
            //         }
            //     }
                    
            // );
        } catch(error) {
            console.log("Axios error handleSubmid validateForm", error)
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography sx={{ mt: 2 }}>
                Pre-preparation
            </Typography>
            <hr/>
            {ValidateData?.filter(haccp => haccp.step === "Pre-preparation").map((haccp, index)=>
                <CardRecipe
                    key={index}
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                    handleChangeData={handleChangeData}
                />
            )}

            <Typography sx={{ mt: 2 }}>
                Preparation
            </Typography>
            <hr/>
            {ValidateData?.filter(item => item.step == "Preparation").map((haccp, index)=>
                <CardRecipe
                    key={index}
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                    handleChangeData={handleChangeData}
                />
            )}

            <Typography sx={{ mt: 2 }}>
                Finalitzation
            </Typography>
            <hr/>
            {ValidateData?.filter(item => item.step == "Finalization").map((haccp, index)=>
                <CardRecipe
                    key={index}
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                    handleChangeData={handleChangeData}
                />
            )}
            {isValidationMode && (
            <>
                <Button
                    sx={{
                    mt: 1.5,
                    mb: 1,
                    width: '100%',
                    backgroundColor: "#DC143C",
                        "&:hover": {
                        backgroundColor: "#dc143c96", 
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
                    sx={{ mt: 1.5, mb: 3, width: '100%',
                    backgroundColor: "#277c27fb",
                        "&:hover": {
                        backgroundColor: "#277c27cf", 
                        }
                    }}
                    variant="contained"
                >
                    Validate Recipe
                </Button>
              </>)}
        </Box>
    );
}
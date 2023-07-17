import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { 
    Box, 
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
    correctiveActions: string[],
}

type CardRecipe = {
    haccp: haccpInfo,
    radioValidate: boolean
};

type validateTypeItem = {
    recipe: String,
    name: String,
    step: [
        {
            haccp: String;
            valid: Boolean;
            correctiveActions?: String;
            comment?: String;
        }
    ]
}

type ValidateType = [
    validateTypeItem
];

type ValidationFormProps = {
    onValidateAdd: (Recipe: any) => void;
};

export const ValidateForm: React.FC<{selectedValidation: haccpInfo[], recipeId: string, isValidationMode:boolean}> = ({selectedValidation, recipeId, isValidationMode}) => {
    //console.log(ValidateForm)

    const { user } = useUser();
    const params = useParams();

    // console.log('selectedValidation', selectedValidation)
    // console.log('recipeId', recipeId)
    // console.log('isValidationMode - Form', isValidationMode)

    const [ValidateData, setValidateData] = useState<haccpInfo[]>(selectedValidation);

    useEffect( () => {
        setValidateData(selectedValidation)
    }, [selectedValidation])


    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            //console.log(formData)
            const response = await axios.post(
                `http://localhost:3000/recipe/validation/`, {
                    formData,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        } catch(error) {
            console.log("Axios error handleSubmid validateForm", error)
        }
    };

    return (
        <Box component="form" 
            onSubmit={handleSubmit}
            >
            <Typography sx={{ mt: 2 }}>
                Pre-preparation
            </Typography>
            <hr/>
            {ValidateData?.filter(haccp => haccp.step === "Pre-preparation").map((haccp)=> 
                <CardRecipe 
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                />
            )}

            <Typography sx={{ mt: 2 }}>
                Preparation
            </Typography>
            <hr/>
            {ValidateData?.filter(item => item.step == "Preparation").map((haccp)=> 
                <CardRecipe 
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                />
            )}

            <Typography sx={{ mt: 2 }}>
                Finalitzation
            </Typography>
            <hr/>
            {ValidateData?.filter(item => item.step == "Finalization").map((haccp)=> 
                <CardRecipe 
                    haccp={haccp}
                    isValidationMode={isValidationMode}
                />
            )}
        </Box>
    );
}
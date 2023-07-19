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
        StepType
    ]
}

type StepType = {
    haccp: String;
    valid: Boolean;
    correctiveActions?: String;
    comment?: String; 
}

// type ValidateType = [
//     validateTypeItem
// ];

// type ValidationFormProps = {
//     onValidateAdd: (Recipe: any) => void;
// };

export const ValidateForm: React.FC<{selectedValidation: haccpInfo[], recipeId: string, recipeName: String, isValidationMode:boolean}> = ({selectedValidation, recipeId, recipeName, isValidationMode}) => {

    const { user } = useUser();
    const params = useParams();

    const [stepData, setStepData] = React.useState<StepType>({
        haccp: '',
        valid: true,
        correctiveActions: '',
        comment: '',
    });

    const [ValidateData, setValidateData] = useState<haccpInfo[]>(selectedValidation);

    useEffect( () => {
        setValidateData(selectedValidation)
    }, [selectedValidation])

    // const [validate, setValidate] = useState<validateTypeItem>({
    //     recipe: recipeId,
    //     name: recipeName,
    //     step: [
    //         haccp: '',
    //         valid: true,
    //         correctiveActions: '',
    //         comment: '' 
    //     ]
    // });

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

    const [data, setData] = useState({});
    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name_id = e.target.name.split('_');
        const id = name_id[1];
        const name = name_id[0];
        const value = e.target.value;

        setData((prevData) => ({ ...prevData, [name]: value }));
        handleChangeValidateTypeItem(data, id)
    }

    const handleChangeValidateTypeItem = (data, id) => {
        
        console.log("data", data)
        console.log("id", id)
         //const stepData = steps.filer(step => stem.haccp === id)
        //  if(stepData) {

        //  } else {
        //     array_push()
        //  }
    }

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
        </Box>
    );
}
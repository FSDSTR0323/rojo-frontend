import React, { useState, useEffect } from "react";
import { 
    Box, 
    Container, 
    TextField, 
    Typography, 
    Radio, 
    RadioGroup, 
    FormControlLabel,
    FormControl
} from "@mui/material";

export const CardRecipe = ({haccp, radioValidate}) => {

    //console.log('haccp', haccp)
    //console.log('haccp?.name', haccp?.name)
    console.log('radioValidate', radioValidate)
    const [isAccepted, setIsAccepted] = useState(null);

    // const [radioValidate, setRadioValidate] = useState(radioValidate);

    const handleChange = (e) => {
        setIsAccepted(e.target.value)
    }

    return (
        <Container
            sx={{
                mb:2,
                pt:2,
                pb:2,
                backgroundColor: "#CCC",
                borderRadius: "5px"
            }}
            >
               <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Haccp name</b></Typography>
                    <hr/>
                    <Typography>{haccp?.name}</Typography>
                </Box> 
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Ingredients status</b></Typography>
                    <hr/>
                    {haccp?.ingredientsStatus.map((item)=> <Typography><li>{item}</li></Typography>)}
                </Box>
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Control</b></Typography>
                    <hr/>
                    {haccp?.control.map((item)=> <Typography><li>{item}</li></Typography>)}
                </Box>
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Procedure</b></Typography>
                    <hr/>
                    <Typography>{haccp?.procedure}</Typography>
                </Box>
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Frecuency</b></Typography>
                    <hr/>
                    {haccp?.frequency.map((item)=> <Typography>{item}</Typography>)}
                </Box>
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Hazzard</b></Typography>
                    <hr/>
                    <Typography>{haccp?.hazzard}</Typography>
                </Box>
                <Box sx={{ mb:3, width: "100%" }}>
                    <Typography><b>Limits</b></Typography>
                    <hr/>
                    {haccp?.limits.map((item)=><Typography><li>{item}</li></Typography>)}
                </Box>
                {radioValidate &&
                    <FormControl
                        // style={{ display: radioValidate ? "block" : "none", width: "100%" }}
                    >
                        <RadioGroup sx={{ mb: 2 }} onChange={handleChange}> 
                            <FormControlLabel name="accept" value={true} control={<Radio />} label="Accept" />
                            <FormControlLabel name="refuse" value={false} control={<Radio />} label="Refuse" />
                        </RadioGroup>
                        {isAccepted && 
                            <Box sx={{ width: "100%" }} >
                                <Box sx={{ mb:3, width: "100%" }}>
                                    <Typography>
                                        <b>Corrective Actions</b>
                                    </Typography>
                                    <hr/>
                                    <RadioGroup sx={{ width: "100%" }}>
                                    {haccp?.correctiveActions.map((ca)=>
                                        <FormControlLabel sx={{ width: "100%" }} value={ca} control={<Radio />} label={ca} />
                                    )}
                                    </RadioGroup>
                                </Box>
                                <Typography>
                                    <b>Comment</b>
                                </Typography>
                                <TextField  sx={{ backgroundColor: "#FFF", borderRadius: "5px", width:"100%" }}/>
                            </Box>
                        }
                    </FormControl>
                } 
        </Container>
    );
}
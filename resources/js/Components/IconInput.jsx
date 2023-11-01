// export default function IconInput({ ...props }) {
//     return (
//         <input type="file" {...props}/>
//     );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, Box } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function IconInput(props) {
    // console.log(props);
    const [iconUrl, setIconUrl] = React.useState(props.user? props.user.icon_url : '');
    const onUploadIcon = (e) => {
        const file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                setIconUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setIconUrl('');
        };
        props.onChange(e);
    }
    return (
        <Box sx={{ display: 'flex'}}>
            <Avatar src={iconUrl} sx={{mr:1}}/>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Icon File
                <VisuallyHiddenInput 
                    type="file" 
                    onChange={(e) => { onUploadIcon(e) }}/>
            </Button>
        </Box>
    );
}
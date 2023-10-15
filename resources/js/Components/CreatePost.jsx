import React, {useEffect, useState, useMemo} from "react";
import Post from "@/Components/Post";
import { useForm } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';
import { Card, Typography, Box, Button, ImageList, ImageListItem, TextField, Select, MenuItem, FormControl, InputLabel} from '@mui/material';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const CreatePost = (props) => {
    const { categories, auth } = props;
    const {data, setData, post} = useForm({
        user_id: auth.user.id,
        category_id: 0,
        body: "",
        images: undefined,
    })
    console.log(data);
    // const watchBody = watch('body', '');
    
    const handleSendPost = (e) => {
        e.preventDefault();
        post(route("store"));
    }
    
    const [files, setFiles] = useState([]);
    // const {getRootProps, getInputProps} = useDropzone({
    //     accept: {
    //         'image/*': []
    //     },
    //     onDrop: acceptedFiles => {
    //         setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             image_url: URL.createObjectURL(file)
    //         })));
    //         setData("images", acceptedFiles.map(file => Object.assign(file, {
    //             image_url: URL.createObjectURL(file)
    //         })));
    //     }
    // });
    
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {'image/*': []},
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                image_url: URL.createObjectURL(file)
            })));
            setData("images", acceptedFiles.map(file => Object.assign(file, {
                image_url: URL.createObjectURL(file)
            })));
        },
        maxFiles:4
    });
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
          <div style={thumbInner}>
              <img
                  src={file.image_url}
                  style={img}
                  // Revoke data uri after image is loaded
                  onLoad={() => { URL.revokeObjectURL(file.image_url) }}
              />
          </div>
      </div>
    ));
  
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.image_url));
    }, []);

    return (
        <Card
            component="form"
            sx={{
                // '& .MuiTextField-root': { m: 1, width: '50ch' },
                '& .MuiFormControl-root': { m: 1, width: '50ch' },
                m:1,
                p:2
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSendPost}
        >
            <Typography variant="h4" sx={{ m: 1 }}>投稿作成</Typography>
            
            <TextField
                label="本文"
                multiline
                onChange={(e) => setData("body", e.target.value)}
                // {...register('body')}
            />
            
            <FormControl>
                <InputLabel>作品カテゴリー</InputLabel>
                <Select label="作品カテゴリー" 
                onChange={(e) => setData("category_id", e.target.value)}
                // {...register('category_id')}
                >
                    { categories.map((category) => (
                      <MenuItem value={ category.id }>{ category.name }</MenuItem>  
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ m:1 }} component="section" className="container">
                <div {...getRootProps({className: 'dropzone', style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(4 files are the maximum number of files you can drop here)</em>
                </div>
                {/* <aside style={thumbsContainer}>
                    {thumbs}
                </aside> */}
            </Box>
            
            <ImageList sx={{ width: 482, m:1}} cols={2} variant="quilted" rowWidth={240} rowHeight={135}>
                { files.map((image) => (
                    <ImageListItem key={image.image_url}>
                        <img
                            src={image.image_url}
                            alt="画像が表示できません"
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            
            <Button variant="outlined" type="submit" sx={{ m:1 }}>送信</Button>
            
            {/* <Post author={auth.user} post={data} comments={0}/> */}
        </Card>
  );
}

export default CreatePost;
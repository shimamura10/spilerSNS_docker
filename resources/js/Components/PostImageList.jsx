import React from "react";
import { Avatar, Paper, Container, Card, Typography, Box, Button, ImageList, ImageListItem} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';


const Post = (props) => {
    const { author, post, comments } = props;
    console.log('post');
    console.log(post);
    console.log(author);
    
    return (
        <Card sx={{ p: 2, m:1}}>
            <Box sx={{ display:'flex', alignItems: 'center'}}>
                <Avatar src={ author.icon_url } />
                <Typography variant="h5" sx={{ ml: 1 }}>{ author.name }</Typography>
            </Box>
            <Typography variant="body1">{ post.body }</Typography>
            <Button variant="outlined">{ post.category }</Button>
            <ImageList sx={{ width: 500, }} cols={2} rowHeight={164}>
                {post.images ? (
                post.images.map((image) => (
                    <ImageListItem key={image.image_url}>
                        <img
                            srcSet={`${image.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${image.image_url}?w=164&h=164&fit=crop&auto=format`}
                            alt="画像が表示できません"
                            loading="lazy"
                        />
                    </ImageListItem>
                ))
                ) : (
                    <p>No Images</p>
                )}
            </ImageList>
            <Typography>コメント数：{ comments }</Typography>
        </Card>
    );
}

export default Post;
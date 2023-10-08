import React from "react";
import axios from "axios";
import { Avatar, Container, Card, Typography, Box, Button, ImageList, ImageListItem, Divider, TextField} from '@mui/material';
import { spacing } from '@mui/system';


const TimeLine = (props) => {
    const { posts, auth } = props;
    const displayComments = (e, id) => {
        const comments = document.getElementById(`post${id}-comments`);
        const button = document.getElementById(`button${id}`);
        if (comments.style.display == 'none') {
            comments.style.display = 'block';
            button.textContent = 'コメントを非表示にする'
        } else {
            comments.style.display = 'none';   
            button.textContent = 'コメントを表示する'
        }
    }
    
    const sendComment = (post_id, e) => {
        e.preventDefault();
        axios.post(route('create.comment'), {
            post_id: post_id,
            user_id: auth.user.id,
            body: e.target.comment.value
        }).then((response) => {
        }).catch(error => {
            console.log(error);
        })
    }
    
    return (
        <Box>
            { posts.map((post) => (
                <Card sx={{ p:2, m:1 }} key={post.id}>
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display:'flex', alignItems: 'center'}}>
                            <Avatar src={ post.author.icon_url } />
                            <Typography variant="h5" sx={{ ml: 1 }}>{ post.author.name }</Typography>
                        </Box>
                        <Button variant="outlined">{ post.category.name }</Button>
                    </Box>
                    <Typography sx={{ m:1 }} variant="body1">{ post.body }</Typography>
                    <ImageList sx={{ m:1, width: 483 }} cols={2} rowHeight={135} variant="quilted">
                        {post.images.map((image) => (
                            <ImageListItem key={image.image_url}>
                                <img
                                    srcSet={`${image.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${image.image_url}?w=164&h=164&fit=crop&auto=format`}
                                    alt="画像が表示できません"
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Typography sx={{ m:1 }}>コメント数：{ post.comments.length }</Typography>
                    
                    <Divider />
                    <Button sx={{ width: "100%" }} variant="text" onClick={(e)=>displayComments(e, post.id)} id={`button${post.id}`}>コメントを表示する</Button>
                    
                    <Box style={{display: 'none'}} id={`post${post.id}-comments`}>
                        <Box component="form" sx={{ display: 'flex', alignItems: 'flex-end' }} onSubmit={(e) => sendComment(post.id, e)}>
                            <TextField
                                name="comment"
                                sx={{mr:1}}
                                label="コメントを入力"
                                multiline
                                maxRows = {10}
                                variant="standard"
                                fullWidth
                            />
                            <Button variant="outlined" type="submit">送信</Button>
                        </Box>
                        {post.comments.map((comment) => (
                            <Box key={comment.id}>
                                <Divider />
                                <Box sx={{ display:'flex', alignItems: 'center'}}>
                                    {/* <Avatar sx={{ width: 24, height: 24, m:1 }} src={ comment.author.icon_url } /> */}
                                    <Typography variant="h6" sx={{ ml: 1 }}>{ comment.author.name }</Typography>
                                </Box>
                                <Typography>{comment.body}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            )) }
        </Box>
    );
}

export default TimeLine;
import React, {useState} from "react";
import axios from "axios";
import { Avatar, Container, Card, Typography, Box, Button, ImageList, ImageListItem, Divider, TextField, IconButton, Stack, Pagination} from '@mui/material';
import { spacing } from '@mui/system';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@inertiajs/react';


const TimeLine = (props) => {
    const { auth } = props;
    const [ posts, setPosts ] = useState(props.posts.data);
    console.log(props.posts);

    // コメントの表示・非表示の切り替え
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
        // フロント側でコメント追加
        const newPosts = [];
        posts.map((post) => {
            if (post.id == post_id)
            {
                post.comments.push({
                    id: crypto.randomUUID,
                    user_id: auth.user.id,
                    post_id: post_id,
                    body: e.target.comment.value,
                    author: auth.user,
                });
                console.log(post);
            } 
            newPosts.push(post);
        });
        setPosts(newPosts);
        // console.log(newPosts);
        // console.log(posts);
        // バックエンドにコメント送信
        axios.post(route('create.comment'), {
            post_id: post_id,
            user_id: auth.user.id,
            body: e.target.comment.value
        }).then((response) => {
        }).catch(error => {
        })
    }

    const storeLike = (e, post_id) => {
        e.preventDefault();
        // フロント側でいいね追加
        const newPosts = [];
        posts.map((post) => {
            if (post.id == post_id)
            {
                post.liked_by.push(auth.user);
            } 
            newPosts.push(post);
        });
        setPosts(newPosts);
        // バックエンドに送信
        axios.post(route('post.storeLike'), {
            post_id: post_id,
            user_id: auth.user.id,
        }).then((response) => {
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteLike = (e, post_id) => {
        e.preventDefault();
        // フロント側でいいね削除
        const newPosts = [];
        posts.map((post) => {
            if (post.id == post_id)
            {
                newPosts.push({...post, liked_by: post.liked_by.filter(like => like.id !== auth.user.id)});
            } else {
                newPosts.push(post);
            }
        });
        setPosts(newPosts);
        // バックエンドに送信
        axios.delete(route('post.deleteLike'), {
            data: {
                post_id: post_id,
                user_id: auth.user.id,
            }
        }).then((response) => {
        }).catch(error => {
            console.log(error);
        })
    }

    // ペジネーション
    const [page, setPage] = useState(props.posts.current_page);
    const pageChange = (e, value) => {
        // console.log(value);
        setPage(value);
        // console.log(props.posts.links.filter((link) => link.label == value)[0].url);
        axios.get(props.posts.links.filter((link) => link.label == value)[0].url).then((response) => {
            console.log(response);
        })
    }
    
    return (
        <Box>
            { posts.map((post) => (
                <Card sx={{ p:2, m:1 }} key={post.id}>
                    {/* ヘッダー */}
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display:'flex', alignItems: 'center'}}>
                            <Avatar src={ post.author.icon_url } />
                            <Typography variant="h5" sx={{ ml: 1 }}>{ post.author.name }</Typography>
                        </Box>
                        <Button variant="outlined">{ post.category.name }</Button>
                    </Box>
                    {/* 本文 */}
                    <Typography sx={{ m:1 }} variant="body1">{ post.body }</Typography>
                    {/* 画像 */}
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
                    {/* いいね、コメント数 */}
                    <Box sx={{display: 'flex', alignItems: 'center'}} >
                        {/* コメント数 */}
                        <Box sx={{display: 'flex', alignItems: 'center'}} >
                            <CommentIcon/>
                            <Typography sx={{ m:1 }}>{ post.comments.length }</Typography>
                        </Box>
                        {/* いいね */}
                        <Box sx={{display: 'flex', alignItems: 'center'}} >
                            {
                                (post.liked_by.find(like => like.id === auth.user.id)) ? (
                                    <IconButton 
                                        sx={{ type:'submit' }}
                                        arial-label=""
                                        size="small"
                                        // value={category.id}
                                        // onClick={handleSendData}
                                        onClick={(e) => deleteLike(e, post.id)}
                                    >
                                        <FavoriteIcon sx={{ color: '#f27481'}}/>
                                    </IconButton>
                                ) : (
                                    <IconButton 
                                        sx={{ type:'submit' }}
                                        arial-label=""
                                        size="small"
                                        // value={category.id}
                                        // onClick={handleSendData}
                                        onClick={(e) => storeLike(e, post.id)}
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                )
                            }
                            <Typography sx={{ m:1 }}>{ post.liked_by.length }</Typography>
                        </Box>
                    </Box>
                    
                    {/* コメント */}
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
                                    <Avatar sx={{ width: 24, height: 24, m:1 }} src={ comment.author.icon_url } />
                                    <Typography variant="h6" sx={{ ml: 1 }}>{ comment.author.name }</Typography>
                                </Box>
                                <Typography>{comment.body}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            )) }
            {/* ペジネーション */}
            <Box sx={{ display:'flex', justifyContent:'space-between', mx:3}} >
                <Link href={props.posts.prev_page_url}>前へ</Link>
                <Link href={props.posts.next_page_url}>次へ</Link>
            </Box>
            {/* <Stack spacing={2}>
                <Pagination count={props.posts.last_page} page={page} onChange={pageChange} />
            </Stack> */}
        </Box>
    );
}

export default TimeLine;
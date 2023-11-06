import React, {useState} from "react";
import { List, ListItem, ListItemText, Box, IconButton, Typography, Paper, InputBase } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import SearchIcon from '@mui/icons-material/Search';
import 'whatwg-fetch';
import axios from "axios";


// const getCsrfToken = () => {
//     const metas = document.getElementsByTagName('meta');
//     for (let meta of metas) {
//         if (meta.getAttribute('name') === 'csrf-token') {
//             // console.log(meta.getAttribute('content'));
//             return meta.getAttribute('content');
//         }
//     }
//     return '';
// }

const FollowCategories = ({categories, user, ...props}) => {    
    // 検索まわり
    const [ searchTerm, setSearchTerm ] = useState("");
    const searchCategories = (e) => {
        e.preventDefault();
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(category => {
            if(searchTerm !== "" && category.textContent.toLowerCase().includes(searchTerm)) {
                category.style.display = 'flex';
            } else {
                category.style.display = 'none';
            }
        })
    }
    
    // カテゴリーのフォローボタンを押したときの処理
    const followCategory = (e, id, name) => {
        // window.fetch(route("follow.category"), {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-Token': getCsrfToken()
        //     },
        //         body: JSON.stringify({
        //             category_id: id,
        //     })
        // })
        axios.post(route("follow.category"), {
            category_id: id,
        }).then((response) => {
            props.addFollowingCategory(id, name);
        });
    }

    // const unfollowCategory = (e, id) => {
    //     axios.delete(route("follow.category"), {
    //         data: {
    //             category_id: id,
    //         }
    //     });
    // }

    const createFollowButton = (categoryId, categoryName) => {
        if (!props.addFollowingCategory) { return (<div></div>)}
        if (user.categories.some(followCategory => followCategory.id === categoryId)) {
            return (
                <IconButton 
                    arial-label=""
                    size="small"
                    onClick={(e) => props.unfollowCategory(e, categoryId)}
                >
                    <PlaylistRemoveIcon sx={{ color: '#3291a8' }}/>
                </IconButton>
            );
        } else {
            return (
                <IconButton 
                    arial-label=""
                    size="small"
                    onClick={(e) => followCategory(e, categoryId, categoryName)}
                >
                    <PlaylistAddIcon sx={{ color: '#a84032' }}/>
                </IconButton>
            );
        }
    }
    
    return (
        <Box>
            <Paper component="form" sx={{ p:'2px 4px', m:1, display:'flex', alignItems:'center' }}
                onSubmit={searchCategories}>
                <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="作品カテゴリーを検索"
                    inputProps={{ 'aria-label': 'search categories' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton type="submit">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <Box>
                <List>
                    { categories.map((category) => (
                        <ListItem sx={{ display:'none' }} disablePadding className="category-option" key={category.id}>
                            { createFollowButton(category.id, category.name) }
                            <ListItemText sx={{ml:1}}primary={ category.name }/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default FollowCategories;
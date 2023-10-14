import React, {useState} from "react";
import { useForm } from '@inertiajs/react';
import { Card, List, ListItem, ListItemButton, ListItemText, Box, Button, IconButton, Typography, Paper, InputBase } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';
import 'whatwg-fetch'


const getCsrfToken = () => {
    const metas = document.getElementsByTagName('meta');
    for (let meta of metas) {
        if (meta.getAttribute('name') === 'csrf-token') {
            console.log(meta.getAttribute('content'));
            return meta.getAttribute('content');
        }
    }
    return '';
}

const FollowCategories = ({categories, user}) => {    
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
        props.addFollowingCategory(id, name);
        window.fetch(route("follow.category"), {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCsrfToken()
            },
                body: JSON.stringify({
                    category_id: id,
            })
        })
    }

    console.log(user.categories);
    console.log(categories);
    
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
            <Box component="form" onSubmit={() => console.log("a")}>
                <List>
                    { categories.map((category) => (
                        user.categories.some(followCategory => followCategory.id === category.id) ? (
                            <div></div>
                        ) : (
                            <ListItem sx={{ display:'none' }} disablePadding className="category-option" key={category.id}>
                                <IconButton 
                                    sx={{ type:'submit' }}
                                    arial-label=""
                                    size="small"
                                    // value={category.id}
                                    // onClick={handleSendData}
                                    onClick={(e) => followCategory(e, category.id, category.name)}
                                >
                                    <PlaylistAddIcon sx={{ pointerEvents: 'none' }}/>
                                </IconButton>
                                <ListItemText sx={{ml:1}}primary={ category.name }/>
                            </ListItem>
                        )
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default FollowCategories;
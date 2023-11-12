import React, {useState} from "react";
import Header from "@/Layouts/Header";
import { Avatar, Card, Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, ListItemText, IconButton} from '@mui/material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimeLine from "@/Components/TimeLine";
import FollowCategories from "@/Components/FollowCategories";

const Mypage = (props) => {
    const { posts, categories } = props;
    console.log(posts);
    
    const [ followingCategories, setFollowingCategories ] = useState(props.user.categories);
    const [ user, setUser ] = useState(props.user);
    
    // フロントでフォロー中のカテゴリーを追加する
    const addFollowingCategory = (id, name) => {
        setFollowingCategories([ ...followingCategories, {id:id, name:name}]);
        setUser({ ...user, categories: [ ...user.categories, {id:id, name:name}]});
    }

    // フロントでフォロー中のカテゴリーを削除する
    const deleteFollowingCategory = (id) => {
        setFollowingCategories([ ...followingCategories.filter((followingCategory) => followingCategory.id !== id) ]);
        setUser({ ...user, categories: [ ...user.categories.filter((followingCategory) => followingCategory.id !== id) ]});
    }

    // フォローを外す
    const unfollowCategory = (e, id) => {
        axios.delete(route("follow.category"), {
            data: {
                category_id: id,
            }
        }).then((response) => {
            deleteFollowingCategory(id);
        });
    }
    
    return (
        <Header auth={props.auth} header={`${user.name}のマイページ`}>
            <Card sx={{ p:2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
                    <Avatar src={ user.icon_url } sx={{ width: 56, height: 56}}/>
                    <Typography variant="h4" sx={{ ml: 1 }}>{ user.name }</Typography>
                </Box>
                <Typography sx={{whiteSpace:"pre-wrap"}}>{ user.message }</Typography>
                {/* <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>フォロー中の作品</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            { user.categories.map((category) => (
                                <ListItem disablePadding key={category.id}>
                                    <ListItemButton component="a" href="#">
                                        <ListItemText primary={ category.name }/>
                                    </ListItemButton>
                                </ListItem>
                            )) }
                        </List>
                    </AccordionDetails>
                </Accordion> */}
            </Card>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
                <TimeLine posts={ posts } auth={ props.auth }/>
                <Card sx={{ p: 2, m:1, width: 500}}>
                    <Typography variant="h5">カテゴリーのフォロー</Typography>
                    <FollowCategories categories={ categories } user={ user } addFollowingCategory={addFollowingCategory} unfollowCategory={unfollowCategory}/>
                    <Typography variant="h5">フォロー中のカテゴリー</Typography>
                    <List>
                        { user.categories.map((category) => (
                            <ListItem disablePadding key={category.id}>
                                <IconButton 
                                    arial-label=""
                                    size="small"
                                    onClick={(e) => unfollowCategory(e, category.id)}
                                >
                                    <PlaylistRemoveIcon sx={{ color: '#3291a8' }}/>
                                </IconButton>
                                <ListItemText primary={ category.name }/>
                            </ListItem>
                        )) }
                    </List>
                </Card>
            </Box>
            
        </Header>
    );
}

export default Mypage;
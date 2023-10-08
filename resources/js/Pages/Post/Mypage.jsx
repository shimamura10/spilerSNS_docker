import React, {useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Header from "@/Layouts/Header";
import { Avatar, Card, Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
// import { ExpandMoreIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimeLine from "@/Components/TimeLine";
import FollowCategories from "@/Components/FollowCategories";

const Mypage = (props) => {
    const { posts, categories } = props;
    
    const [ followingCategories, setFollowingCategories ] = useState(props.user.categories);
    const [ user, setUser ] = useState(props.user);
    console.log(user);
    
    const addFollowingCategory = (id, name) => {
        // followingCategories.push({id:4, name:"ダンガンロンパ"})
        setFollowingCategories([ ...followingCategories, {id:id, name:name}])
        setUser({ ...user, categories: [ ...user.categories, {id:id, name:name}]})
        // setFollowingCategories([ ...followingCategories, {id:4, name:"ダンガンロンパ"}])
        // console.log(followingCategories);
    }
    
    return (
        <Header auth={props.auth} header={`${user.name}のマイページ`}>
            <Card>
                <Box sx={{ display:'flex', alignItems: 'center'}}>
                    <Avatar src={ user.icon_ur } />
                    <Typography variant="h5" sx={{ ml: 1 }}>{ user.name }</Typography>
                </Box>
                <Typography>{ user.message }</Typography>
                <Accordion>
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
                </Accordion>
            </Card>
            
            <Box sx={{ display: 'flex' }}>
                <TimeLine posts={ posts }/>
                <FollowCategories categories={ categories } user={ user } addFollowingCategory={addFollowingCategory}/>
            </Box>
            
        </Header>
    );
}

export default Mypage;
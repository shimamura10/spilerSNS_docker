import React from "react";
import Header from "@/Layouts/Header";
import TimeLine from "@/Components/TimeLine";
import CreatePost from "@/Components/CreatePost";
import { Box } from '@mui/material';

const Home = (props) => {
    const { posts, categories, next_url } = props;
    
    return (
        <Header auth={props.auth} header="ホーム">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TimeLine posts={ posts } auth={ props.auth } next_url={ next_url }/>
                <CreatePost categories={ categories } auth={ props.auth }/>
            </Box>
        </Header>
    );
}

export default Home;
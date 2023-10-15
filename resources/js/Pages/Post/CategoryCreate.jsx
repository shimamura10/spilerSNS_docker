import React, { useState } from "react";
import Header from "@/Layouts/Header";
import TimeLine from "@/Components/TimeLine";
import CreatePost from "@/Components/CreatePost";
import { Box, Button, Card, FormControl, FormControlLabel, FormGroup, TextField, Typography,Checkbox, Divider } from '@mui/material';
import FollowCategories from "@/Components/FollowCategories";
import { CheckBox } from "@mui/icons-material";
import { useForm } from "@inertiajs/react";


const CategoryCreate = (props) => {
    const { categories, user } = props;
    console.log(categories);
    console.log(props.errors);
    // 新規カテゴリー名の送信
    const {data, setData, post} = useForm({
        name: "",
    });
    const handleCreateCategory = (e) => {
        e.preventDefault();
        post(route("category.store"));
    };

    // チェックボックスの状態
    // const [checkedList, setCheckedList] = useState({
    //     a: false,
    //     b: false,
    // });
    // const handleCheck = (e) => {
    //     setCheckedList({
    //         ...checkedList,
    //         [e.target.name]: e.target.checked,
    //     });
    // };

    return (
        <Header auth={props.auth} header="作品カテゴリーの新規作成">
            <Card sx={{ p: 2, mx: "auto", my: 1, width: 500}}>
                <Typography>作品カテゴリーの新規作成は慎重に行ってください</Typography>
                <Typography>以下の注意事項をよく読み、全ての項目にチェックを入れたうえで新規作成ボタンを押してください</Typography>
                <FollowCategories categories={categories} user={user}/>
                <FormControl component="form" onSubmit={handleCreateCategory}>
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Checkbox required/>
                            }
                            label="すでに同じ作品のカテゴリーが作られていないか上の検索ボックスで調べる。"
                            sx={{mb: 2}}
                        />
                        <FormControlLabel 
                            control={
                                <Checkbox required/>
                            }
                            label="作成しようとしているカテゴリー名が特定の作品を指していることが、大多数の人に理解できる。公式ホームページやWikipediaなどから作品名を引用してくることを推奨します。"
                        />
                    </FormGroup>
                    <TextField 
                        variant="standard" 
                        label="新規作品カテゴリー名" 
                        required onChange={(e) => setData({name: e.target.value})}
                        error={(props.errors.name)}
                        helperText={props.errors.name}
                    />
                    <Button type="submit">新規作成</Button>
                </FormControl>
            </Card>
        </Header>
    );
}

export default CategoryCreate;
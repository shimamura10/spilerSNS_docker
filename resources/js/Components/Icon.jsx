import React from "react";

const Icon = (props) => {
    const { user } = props;
    
    return (
        <div>
            <img src={ user.icon_url } alt="アイコン" className="rounded-full w-32 h-32"/>
        </div>
    );
}

export default Icon;
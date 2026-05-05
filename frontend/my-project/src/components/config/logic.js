import { Restaurant } from "@mui/icons-material";

export const isPresentInFavorites = (favorites,restaurant) => {
    for(let item of favorites){
        if(Restaurant.id===item.id){
            return true
        }
    }
    return false;
}
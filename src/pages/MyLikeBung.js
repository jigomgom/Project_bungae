import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//Components
import SearchCard from "../components/SearchCard";

function MyPageRecent() {
  const [ isLoad, setIsLoad ] = useState( true );
  const myLikeList = useSelector( state => state.Bungle.myLikeList );

  useEffect(()=>{
    if( isLoad ){
      setTimeout(()=>{setIsLoad( false )}, 200);
    }
  },[])
  console.log( myLikeList );
  return ( 
    <div style={{ marginBottom: "70px" }}>
      { myLikeList.map( ( item, index ) => {
        return <SearchCard myLikeList={item}/>
      })}
      {/* <SearchCard />
      <SearchCard />
      <SearchCard />
      <SearchCard />
      <SearchCard />
      <SearchCard />
      <SearchCard /> */}
    </div>
  );
}

export default MyPageRecent;

import React from "react";

const UserItem = (props) => {

  return (
    <div className="card white darken-1 hoverable collection">
      <div className="card-content black-text collection-item avatar">
        <img src={props.image} alt="" class="circle" />
        <span className="card-title">{props.username}</span>
        <p className="card-places">{props.places} {props.places <= 1 ? 'Place':'Places'}</p>
      </div>
    </div>
  );
};

export default UserItem;
